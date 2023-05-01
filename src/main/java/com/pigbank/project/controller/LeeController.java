package com.pigbank.project.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AutoTransferDTO;
import com.pigbank.project.dto.TransferDTO;
import com.pigbank.project.service.LeeServiceImpl;


@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class LeeController {
	
	private static final Logger logger = LoggerFactory.getLogger(LeeController.class);
	
	@Autowired
	private LeeServiceImpl service;
	

	// http://localhost:8081/Accounts
	// 계좌조회
	@GetMapping(value="/Accounts")
	public List<AccountDTO> accountList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - accountList >>>");
		
		List<AccountDTO> list = service.accountList(req, model);
		
		System.out.println(list);
		return list;
	}
	
	@PostMapping(value="/Transfer")
	public void insertTransfer(@RequestBody TransferDTO dto)
			throws ServletException, IOException {
				logger.info("<<< url - InsertTransfer");
		
				System.out.println("dto : " + dto);
				service.InsertTransfer(dto);
	}
	
	@PostMapping(value="/autoTransfer")
	public void autoInsertTransfer(@RequestBody AutoTransferDTO dto)
			throws ServletException, IOException {
		logger.info("<<< url - InsertTransfer");
		System.out.println("dto : " + dto);
		service.AutoInsertTransfer(dto);
	}
}
