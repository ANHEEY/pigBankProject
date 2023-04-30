package com.pigbank.project.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.service.HyeServiceImpl;

@CrossOrigin(origins="**",maxAge=3600)
@RestController
@RequestMapping(value = "/admin") 
public class HyeController {
	private static final Logger logger = LoggerFactory.getLogger(HyeController.class);

	@Autowired
	HyeServiceImpl service;
	
	/*****************			회원 정보 목록			***************/
	@GetMapping("/listCustomerAll")
	public List<CustomerDTO> listCustomerAll(HttpServletRequest req, Model model)
		throws ServletException, IOException{
		logger.info("== URL || listCustomerAll == ");
		return service.listCustomerAll(req, model);
	}
	/*****************		고객 조회(회원 상세 페이지)		***************/
	@GetMapping("/detailCustomer/{id}")
	public CustomerDTO detailCustomer(@PathVariable String id)
		throws ServletException , IOException{
		logger.info("== URL || detailCustomer == ");
		return service.detailCustomer(id);
	}
	@GetMapping("/detailCustomerAccount/{id}")
	public List<AccountDTO> detailCustomerAccount(@PathVariable String id)
		throws ServletException , IOException{
		logger.info("== URL || detailCustomerAccount == ");
		return service.detailAccountById(id);
	}
	/*****************		탈퇴 요청 고객 목록		***************/
	@GetMapping("/listWithdrawal")
	public List<CustomerDTO> listWithdrawal(HttpServletRequest req, Model model)
		throws ServletException, IOException{
		logger.info("== URL || listWithdrawal == ");
		return service.listCustomerWithdrawal(req, model);
	}
	/*****************		탈퇴 승인 (Update)		***************/
	@PutMapping("/updateCustomerState/{id}")
	public void updateCustomer(@PathVariable String id, @RequestBody Map<String, Object> body)
			throws ServletException, IOException {
		logger.info("== URL || updateCustomer == ");
		service.updateStateApproval(id);
	}
	@PutMapping("/rejectCustomerState/{id}")
	public void rejectCustomer(@PathVariable String id, @RequestBody Map<String, Object> body)
		throws ServletException, IOException{
		logger.info("=== url | rejectCustomer ==");
		service.updateStateReject(id);
	}
}
