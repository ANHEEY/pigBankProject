package com.pigbank.project.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pigbank.project.dao.CustomerMapper;
import com.pigbank.project.dto.CustomerDTO;

@Service
public class PrincipalDetailsService implements UserDetailsService {

	@Autowired
	private CustomerMapper dao;
	
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
