package com.pigbank.project.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.pigbank.project.auth.PrincipalDetails;
import com.pigbank.project.dao.CustomerMapper;
import com.pigbank.project.dto.CustomerDTO;

//시큐리티가 filter를 가지고 있는데, 그 필터중에 BasicAuthenticationFilter를 상속
//권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 타게 되어 있음.
//만약에 권한이나 인증이 필요한 주소가 아니라면 이 필터를 안탄다.

//인가 느낌
public class JwtAuthorizationFilter extends BasicAuthenticationFilter{

	private CustomerMapper customerMapper;
	
	public JwtAuthorizationFilter(AuthenticationManager authenticationManager,CustomerMapper customerMapper) {
		super(authenticationManager);
		this.customerMapper = customerMapper;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		//나중에 반드시 주석처리하기,이 문장 작성시 세션이 안만들어짐, 맨 아래서도 응답하므로 반드시!!
		//super.doFilterInternal(request, response, chain);
		System.out.println("인증이나 권한이 필요한 주소 요청을 함!!");
		System.out.println("JwtProperties.HEADER_STRING : "+request.getHeader(JwtProperties.HEADER_STRING));
		
		String jwtHeader = request.getHeader(JwtProperties.HEADER_STRING);//수정1."Authorization"
		System.out.println("jwtHeaders"+ jwtHeader);
		
		//header가 있는지 확인 
		if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {//수정하지 않음!!!!!
			chain.doFilter(request, response);
			return;
		}
		//JWT 토큰 검증을 해서 정상적인 사용자인지 확인
		String jwtToken = request.getHeader(JwtProperties.HEADER_STRING)//수정2."Authorization"
			.replace(JwtProperties.TOKEN_PREFIX,"");//수정3."Bearer "//Bearer를 뺀 실제 JWT 토큰값 파싱, 주의 => Bearer+" " 까지 대체해야함
		
		String id = 
				JWT
				.require(Algorithm.HMAC512(JwtProperties.SECRET))//수정4."cors"
				.build()
				.verify(jwtToken)
				.getClaim("id")
				.asString();
		
		//서명이 정상적으로 됨
		if(id != null) {
			System.out.println("id 정상!!");
			
			CustomerDTO customerDTO = customerMapper.loginCustomer(id);
			
			System.out.println("customerDTO.getId() : "+customerDTO.getId());
			
			PrincipalDetails principalDetails = new PrincipalDetails(customerDTO);
			
			//JWT 토큰 서명을 통해서 서명이 정상이면 Authentication 객체를 만들어준다.
			Authentication authentication 
			= new UsernamePasswordAuthenticationToken(
					principalDetails,//나중에 컨틀롤러에서 DI해서 쓸 때 사용
					null,	//패스워드는 아직 모르니까 null
					principalDetails.getAuthorities());
			//강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
		}
		
		chain.doFilter(request, response);
	}

}
