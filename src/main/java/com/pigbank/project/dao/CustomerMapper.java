package com.pigbank.project.dao;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.CustomerDTO;

@Mapper
public interface CustomerMapper {

	public void insertCustomer(CustomerDTO customerDTO);
	
	public CustomerDTO loginCustomer(String id);
	
}
