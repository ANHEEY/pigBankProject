package com.pigbank.project.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pigbank.project.dao.CustomerMapper;
import com.pigbank.project.dto.CustomerDTO;

@Service
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private CustomerMapper dao;
	
	@Override
	public void insertCustomer(CustomerDTO customerDTO) {
		String encryptPwd = passwordEncoder.encode(customerDTO.getPwd());
		customerDTO.setPwd(encryptPwd);
		
		dao.insertCustomer(customerDTO);
	}

	@Override
	public int loginCustomer(Map<String, String> map) {
		return 0;
	}

}
