package com.pigbank.project.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.pigbank.project.dto.CustomerDTO;

import lombok.Data;

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
		return null;
	}

	@Override
	public String getUsername() {
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return false;
	}

}
