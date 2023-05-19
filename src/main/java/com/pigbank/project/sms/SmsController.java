package com.pigbank.project.sms;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import org.apache.ibatis.io.ResolverUtil.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.pigbank.project.controller.ChuController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SmsController {

	private static final Logger logger = LoggerFactory.getLogger(ChuController.class);
	
	@Autowired
    private final SmsService smsService;
	private int numValue;
	
    @PostMapping(value="/user/sms")
    public ResponseEntity<Integer> test(@RequestBody Request request) 
    		throws NoSuchAlgorithmException, URISyntaxException, UnsupportedEncodingException, InvalidKeyException, JsonProcessingException {
        logger.info("[본인인증 메시지 전송]");
    	
        int valueNum = smsService.sendSms(request.getRecipientPhoneNumber(), request.getContent());
        this.numValue = valueNum;
        return ResponseEntity.ok().body(valueNum);
    }
  
}
