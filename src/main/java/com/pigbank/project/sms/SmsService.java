package com.pigbank.project.sms;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
//import redis.clients.jedis.Jedis;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import redis.clients.jedis.Jedis;

@Service
@Transactional
public class SmsService {

    @Value("ncp:sms:kr:307402342518:pigbank")
    private String serviceId;
    @Value("0fEnFC9h8BNlOiPnYV2x")
    private String accessKey;
    @Value("x3ZsaUW3a1OAQ27jEmK0ZhRXJ0Lu345aZKeqJD2P")
    private String secretKey;

    // 문자전송
    public int sendSms(String recipientPhoneNumber, String content) 
    		throws JsonProcessingException, UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, URISyntaxException {
        System.out.println("Service - 본인인증 문자전송");
    	
    	Long time = System.currentTimeMillis();
        List<MessageDto> messages = new ArrayList<>();
 
        // 5자리의 랜덤수
        Random random = new Random();        
        int randomNumber = random.nextInt(90000) + 10000; // 10000부터 99999까지의 범위에서 랜덤 수 생성
        String Number = String.valueOf(randomNumber);
        
        // 문자전송 - recipientPhoneNumber: 화면에서 받아오는 수신번호
        messages.add(new MessageDto(recipientPhoneNumber, "[PIGBANK] 인증번호: "+ Number)); // 수신번호 화면에서 받기
        
        SmsRequest smsRequest = new SmsRequest("SMS", "COMM", "82", "01041360094", "내용", messages);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(smsRequest);
           
        // Header에 정보 저장
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", this.accessKey);
        String sig = makeSignature(time); //암호화
        headers.set("x-ncp-apigw-signature-v2", sig);

        HttpEntity<String> body = new HttpEntity<>(jsonBody,headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        SmsResponse smsResponse = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/"+this.serviceId+"/messages"), body, SmsResponse.class);
        
        return randomNumber;

    }
      
    // 암호화
    public String makeSignature(Long time) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {

        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/"+ this.serviceId+"/messages";
        String timestamp = time.toString();
        String accessKey = this.accessKey;
        String secretKey = this.secretKey;

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }
     
}