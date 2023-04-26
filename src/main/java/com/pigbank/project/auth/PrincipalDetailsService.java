package com.pigbank.project.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pigbank.project.dao.CustomerMapper;
import com.pigbank.project.dto.CustomerDTO;

//http://localhost:8081/login => 여기서 동작을 안한다.(.formLogin().disable() 때문에)
//시큐리티 설정에 의해 .loginProcessingUrl("/loginProc")
//-> /loginProc 요청이 오면 UserDetailService 타입의 loadUserByUsername 함수를 자동으로 호출
//반드시 UserDetailsService implements해야한다

@Service
public class PrincipalDetailsService implements UserDetailsService {
	//인증단계
	
	@Autowired
	private CustomerMapper dao;
	
	//매개변수 id : 로그인 화면의 input name과 반드시 일치 "id"
	//Security Session -> Authentication -> UserDetails(=>attemptAuthentication()에서 호출) ->PrincipalDetails(=>successfulAuthentication()에서 호출)
	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		System.out.println("<<<PrincipalDetailsService - loadUserByUsername>>>");
		System.out.println("<<<id :"+id);
		
		CustomerDTO customerDTO = dao.loginCustomer(id);
		System.out.println("customerDTO : "+customerDTO);
		
		if(customerDTO != null) {
			return new PrincipalDetails(customerDTO);
		}		
		return null;
	}
	

}
