package com.pigbank.project.service;

import java.util.Map;

import com.pigbank.project.dto.CustomerDTO;

public interface CustomerService {

	public void insertCustomer(CustomerDTO customerDTO);
	
	public int loginCustomer(Map<String,String> map);
	
}
