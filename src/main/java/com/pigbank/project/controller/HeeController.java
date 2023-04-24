package com.pigbank.project.controller;

import java.io.IOException;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.service.CustomerServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class HeeController {

	private static final Logger logger = LoggerFactory.getLogger(HeeController.class);
	
	@Autowired
	private CustomerServiceImpl service;
	
	//회원가입
	@PostMapping
	public void customerJoin (@RequestBody CustomerDTO customerDTO)
			throws ServletException,IOException{
		logger.info("url - customerJoin");
		
		service.insertCustomer(customerDTO);
		System.out.println("customerJoin 성공");

	}
	

}
