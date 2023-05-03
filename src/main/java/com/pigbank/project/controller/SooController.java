package com.pigbank.project.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.LoanRequestDTO;
import com.pigbank.project.service.SooServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class SooController {

	private static final Logger logger = LoggerFactory.getLogger(SooController.class);


	@Autowired
	private SooServiceImpl service;
	
	// 대출 상품 리스트
	@GetMapping(value="/loan/admin/list")
	public List<LoanProductDTO> loanProductList(HttpServletRequest req, Model model)
		throws ServletException, IOException {
			logger.info("<<< url - loanProductList >>>");
			
			List<LoanProductDTO> list = service.pdLoanList(req, model);
			
			return list;
	}
	
	// 대출 상품 추가
	@PostMapping(value="/loan/admin/add")
	public void addPdLoan(@RequestBody LoanProductDTO loanProductDTO)
			throws ServletException, IOException {
		logger.info("<<< url - pdLoanAdd >>>");
		
		service.pdLoandInsert(loanProductDTO);
		
		System.out.println("pdLoanAdd");
	}

	// 1건 select
	@GetMapping("/loan/admin/{lpdName}")
	public LoanProductDTO fetchProductByName(@PathVariable String lpdName)		
		throws ServletException, IOException {
		logger.info("<<< url - fetchProductByName >>>");
		
		return service.selectProduct(lpdName);
	}
		
	// 대출상품 수정
	@PutMapping("/loan/admin/edit/{lpdName}")
	public void editPdLoan(@PathVariable String lpdName, @RequestBody LoanProductDTO dto)		
		throws ServletException, IOException {
		logger.info("<<< url - editPdLoan >>>");
		
		service.editProduct(dto);
		System.out.println("[ edit 성공~~ ]");
	}
	
	// 대출상품 삭제
	@PutMapping("/loan/admin/delete/{lpdName}")
	public void deletePdLoan(@PathVariable String lpdName)
		throws ServletException, IOException {
		logger.info("<<< url - deletePdLoan() >>>");
		
		service.deleteProduct(lpdName);
		System.out.println("[ Delete 성공~~ ]");
	}
	
	// 대출상품 신청
	@PostMapping(value="/loan/customer/addReq")
	public void requestPdLoan(@RequestBody LoanRequestDTO loanRequestDTO)
		throws ServletException, IOException {
		logger.info("<<< url - requestPdLoan() >>>");
		
		service.requestProduct(loanRequestDTO);
		System.out.println("[ Delete 성공~~ ]");
	}
	
	// 대출 심사 결과 조회 (고객용)
	@GetMapping(value="/loanAccount/listLoanSate/{id}")
	public List<LoanRequestDTO> loanStateList(@PathVariable String id)
		throws ServletException, IOException {
			logger.info("<<< url - loanStateList >>>");
			
			List<LoanRequestDTO> list = service.loanStateList(id);
			
			return list;
	}
	
	// 대출 신청 목록 조회 (관리자용)
	@GetMapping(value="/loan/listLoanSate")
	public List<LoanRequestDTO> loanStateList()
		throws ServletException, IOException {
			logger.info("<<< url - loanStateList >>>");
			
			List<LoanRequestDTO> list = service.loanRequestList();
			
			return list;
	}
	
	// 대출 신청 승인 
	@PutMapping("/loan/acceptLoan/{lreqNum}")
	public void acceptPdLoan(@PathVariable int lreqNum)		
		throws ServletException, IOException {
		logger.info("<<< url - acceptPdLoan >>>");
		
		// 승인 후 대출계좌 생성
		service.acceptLoan(lreqNum);
		
		// 상환 스케쥴 생성
		service.createLoanPaySchedule(lreqNum);
		
		
	}
	
	// 대출 신청 거절
	@PutMapping("/loan/refuseLoan/{lreqNum}/{lreason}")
	public void refusePdLoan(@PathVariable int lreqNum, @PathVariable String lreason)		
		throws ServletException, IOException {
		logger.info("<<< url - refusePdLoan >>>");
		
		System.out.println(lreason);
		
		service.refuseLoan(lreqNum, lreason);
	}
	
	
}
