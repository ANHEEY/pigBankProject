package com.pigbank.project.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.pigbank.project.dto.CustomerDTO;

import lombok.Data;
import lombok.Getter;

/*
 * - '/loginProc' 주소가 호출되면 시큐리티가 가로채서 대신 로그인을 처리한다
 * - 로그인이 완료되면 시큐리티 session을 만든다. (Security ContextHolder key에 세션정보 저장)
 * 
 * - Security Session => Authentication 객체 => UserDetails => PrincipalDetails
 * - Authentication 객체는 Object타입이며, CustomerDTO 정보가 들어있어야 한다. UserDetails로 전달
 * */

@Data
public class PrincipalDetails implements UserDetails{

	private CustomerDTO customerDTO;
	
	public PrincipalDetails(CustomerDTO customerDTO) {
		this.customerDTO = customerDTO;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		System.out.println("PrincipalDetails를 탔다");
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new GrantedAuthority() {
			
			@Override
			public String getAuthority() {
				return customerDTO.getAuthority();
						
				
			}
		});
		System.out.println("authorities : "+authorities);
		System.out.println("customerDTO.getAuthority() : "+customerDTO.getAuthority());
		return authorities;
	}
	
//	Collection<GrantedAuthority> authorities = new ArrayList<>();
//	userDTO.getRoleList().forEach(role ->{
//		authorities.add(() ->role);
//	});
//	
//	return authorities;

	@Override
	public String getPassword() {
		return customerDTO.getPwd();
	}

	@Override
	public String getUsername() {
		return customerDTO.getName();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
