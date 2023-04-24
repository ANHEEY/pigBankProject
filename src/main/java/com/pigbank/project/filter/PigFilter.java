package com.pigbank.project.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PigFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse res = (HttpServletResponse)response;
		
		/*
	    // 토큰 : cors 이걸 만들어줘야 함. username,password 가 정상적으로 들어와서 로그인이 완료되면 토큰을 만들어주고 응답을 해준다.
	    // 요청할 때마다 header에 Authorization에 value값으로 토큰을 가져온다.
	    // 그 때 토큰이 넘어오면 이 토큰이 내가 만든 토큰이 맞는지만 검증만 하면 됨(RSA, HS256)
	    // RSA 방식이라면 private key로 잠궈서 넘겨주고, 내가 받아서 public key로 열어서 정상이면 열린다.
	    // HS256 방식을 많이 사용한다.
		 */
		
		//임시토큰 생성
		if(req.getMethod().equals("POST")) {//대문자
			System.out.println("POST 요청");
			
			String headerAuth = req.getHeader("Authorization");
			System.out.println("headerAuth : "+headerAuth);
			System.out.println("<<<<PigFilter>>>>");	
			
			//토큰 : cors라는 JWT(JSON WEB TOKEN) 토큰이 넘어오면 doFilter 메서드를 통해 인증이 되어 컨트롤러 진입,
			//그렇지 않으면 토큰이 없으므로 진입불가
			//POSTMAN에서 설정 => Headers탭 선택 후 입력=> key:Authorization | value:cors
			if(headerAuth.equals("cors")) {//키는 영문으로....
				chain.doFilter(request, response);
			}
			else {
				res.setCharacterEncoding("UTF-8");
				res.setContentType("text/html; charset=UTF-8");
				PrintWriter out = res.getWriter();
				out.println("인증안됨!!!!!!");
			}			
		}
	}

}
