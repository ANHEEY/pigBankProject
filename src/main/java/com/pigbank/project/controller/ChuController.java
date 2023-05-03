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
import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;
import com.pigbank.project.dto.ExchangeRateDTO;
import com.pigbank.project.dto.ExchangeRateListDTO;
import com.pigbank.project.dto.LoanAccountDTO;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;
import com.pigbank.project.dto.TransferDTO;
import com.pigbank.project.service.ChuServiceImpl;


//@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class ChuController {

	private static final Logger logger = LoggerFactory.getLogger(ChuController.class);
	
	@Autowired
	private ChuServiceImpl service;
	

	// http://localhost:8081/members
	
	
	//적금상품조회
	@GetMapping(value="/members")
	public List<SavingProductDTO> savingList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - savingList >>>");
		
		List<SavingProductDTO> list = service.savingList(req, model);
		System.out.println(list);
		return list;
	}
	
	//예금상품조회
	@GetMapping(value="/deposit")
	public List<DepositProductDTO> depositList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - depositList >>>");
		
		List<DepositProductDTO> list = service.depositList(req, model);
		System.out.println(list);
		return list;
	}
	
	//대출상품조회
	@GetMapping(value="/loan")
	public List<LoanProductDTO> loanList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - depositList >>>");
		
		List<LoanProductDTO> list = service.loanList(req, model);
		System.out.println(list);
		return list;
	}
	
	//입출금통장계좌조회
	@GetMapping(value="/account")
	public List<AccountDTO> accountList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - accountList >>>");
		
		List<AccountDTO> list = service.accountList(req, model);
		System.out.println(list);
		return list;
	}
	
	//예금계좌조회
	@GetMapping(value="/depositAccount")
	public List<DepositAccountDTO> depositAccountList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - depositAccountList() >>>");
		
		List<DepositAccountDTO> list = service.depositAccountList(req, model);
		System.out.println(list);
		
		return list;
	}
	
	//적금계좌조회
	@GetMapping(value="/savingAccount")
	public List<SavingAccountDTO> savingAccountList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - savingAccountList() >>>");
		
		List<SavingAccountDTO> list = service.savingAccountList(req, model);
		System.out.println(list);
		
		return list;
	}
	
	//대출계좌조회
	@GetMapping(value="/loanAccount")
	public List<LoanAccountDTO> loanAccountList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - loanAccount() >>>");
		
		List<LoanAccountDTO> list = service.loanAccountList(req, model);
		System.out.println(list);
		
		return list;
	}

	//대출상태조회
	@GetMapping(value="/loanState")
	public List<LoanAccountDTO> loanState(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - loanState() >>>");
		
		List<LoanAccountDTO> list = service.loanState(req, model);
		System.out.println(list);
		
		return list;
	}
	
	//대출상태조회
	@GetMapping(value="/transferList")
	public List<TransferDTO> transferList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - transferAccount() >>>");
		
		List<TransferDTO> list = service.transferList(req, model);
		System.out.println(list);
		
		return list;
	}
	
	@GetMapping(value="/exchangeList")
	public List<ExchangeRateListDTO> exchangeList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - exchangeList() >>>");
		
		List<ExchangeRateListDTO> list = service.exchangeList(req, model);
		System.out.println(list);
		
		return list;
	}


	
}
