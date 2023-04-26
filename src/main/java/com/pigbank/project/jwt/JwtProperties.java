package com.pigbank.project.jwt;

public interface JwtProperties {
	String SECRET = "cors";	//우리 서버만 알고 있는 비밀값
	int EXPIRATION_TIME = 1000*60*50;//20분 (1분/1000초)
	String TOKEN_PREFIX="Bearer ";
	String HEADER_STRING = "Authorization";
	
	
}
