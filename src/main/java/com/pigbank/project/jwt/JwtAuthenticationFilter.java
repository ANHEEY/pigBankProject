package com.pigbank.project.jwt;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor//final오류나면 주기
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;//@RequiredArgsConstructor 추가해야 에러 안남
	
	//	/login 요청을 하면 로그인 시도를 위해서 자동으로 실행되는 함수
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		System.out.println("<<<JwtAuthenticationFilter:로그인 시도중>>>");
		
		// 1. 화면에서 username, password로 로그인해서 DB에 있는지 확인
		// authenticationManager으로 로그인 시도를 하면 PrincipalDetailsService의 loadUserByUsername() 자동 실행      
		// 2. PrincipalDetails가 리턴되면 PrincipalDetails를 세션에 담고(SecurityConfig.java의 권한관리를 위해)      
		// 3. JWT 토큰을 만들어서 응답해주면 됨
		
		try {
			System.out.println(request.getInputStream().toString());
		}catch(IOException e) {
			e.printStackTrace();
		}
		
		
		return super.attemptAuthentication(request, response);
	}
}
