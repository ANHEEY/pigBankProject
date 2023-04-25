package com.pigbank.project.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	@PostMapping(value="/customerJoin")
	public void customerJoin (@RequestBody CustomerDTO customerDTO)
			throws ServletException,IOException{
		logger.info("url - customerJoin");
		System.out.println("customerDTO : "+customerDTO);
		service.insertCustomer(customerDTO);
		System.out.println("customerJoin 성공");
	}
	
	//로그인
	@PostMapping(value="/login")
	public String login(@RequestBody CustomerDTO customerDTO) 
			throws ServletException,IOException {
		logger.info("url - login");
		System.out.println("customerDTO : "+customerDTO);
		
		System.out.println("login성공");
		return null;
	}
	

}
