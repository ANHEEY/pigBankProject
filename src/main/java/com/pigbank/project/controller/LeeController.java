package com.pigbank.project.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.SavingProductDTO;
import com.pigbank.project.service.LeeServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class LeeController {
	
	private static final Logger logger = LoggerFactory.getLogger(LeeController.class);
	
	@Autowired
	private LeeServiceImpl service;
	

	// http://localhost:8081/Accounts
	//적금상품조회
	@GetMapping(value="/Accounts")
	public List<AccountDTO> accountList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - accountList >>>");
		
		List<AccountDTO> list = service.accountList(req, model);
		System.out.println(list);
		return list;
	}
}
