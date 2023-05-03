package com.pigbank.project.config;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.service.CustomerServiceImpl;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

	// JWT를 생성하고 읽으려면 비밀키가 필요하다.
	// 애플리케이션 yml 파일에서 구성하고 여기에 주입한다.
	// 그러나 JVM에서 기본값을 가질수도 있다.

	@Value("${security.jwt.token.secret-key:secret-value}")
	private String secretKey;
	
	private final CustomerServiceImpl service;
	
	@PostConstruct
	protected void init() {
		// 일단 텍스트로 된 비밀키를 피하기 위해 base64로 인코딩
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}
	
	public String createToken(String id) {
		
		System.out.println("<<< UserAuthProvider - createToken >>>");
		
		Date now = new Date();  // java.util
		Date validity = new Date(now.getTime() + 36000000);  // 토큰 유효시간 10시간
		
		// JWT를 사용하려면 pom.xml에 java-jwt 추가
		return JWT.create()
				.withIssuer(id)
				.withIssuedAt(now)
				.withExpiresAt(validity)
				.sign(Algorithm.HMAC256(secretKey));
	}
	
	public Authentication validateToken(String token) {  // Authentication : import security.core 주의
		System.out.println("<<< UserAuthProvider - validateToken >>>");
		System.out.println("<<< UserAuthProvider - token >>> " + token);
		
		// import com.auth0.jwt.JWTVerifier;  // 주의
		JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey))
				.build();
		
		System.out.println("<<< UserAuthProvider - validateToken 1 >>> ");
		
		DecodedJWT decoded = verifier.verify(token);  // JWT를 확인하기 위해 먼저 디코딩한다.
		                                              // 유효기간을 초과하면 예외가 발생한다.
		
		System.out.println("<<< UserAuthProvider - validateToken 2 >>> ");
		CustomerDTO customerDTO = service.cusById(decoded.getIssuer());
		
		// 사용자가 내 데이터베이스에 존재하는지 확인
		return new UsernamePasswordAuthenticationToken(customerDTO, null, Collections.emptyList());
		
	}
}
