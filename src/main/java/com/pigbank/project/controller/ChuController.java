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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
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
		logger.info("<<< url - deposit >>>");
		
		List<DepositProductDTO> list = service.depositList(req, model);
		System.out.println(list);
		return list;
	}
	
	//대출상품조회
	@GetMapping(value="/loan")
	public List<LoanProductDTO> loanList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - loan >>>");
		
		List<LoanProductDTO> list = service.loanList(req, model);
		System.out.println(list);
		return list;
	}
	
	//입출금통장계좌조회
	@GetMapping(value="/account/{id}")
	public List<AccountDTO> accountList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< url - account >>>");
		
		List<AccountDTO> list = service.accountList(id);
		
		System.out.println(list);
		return list;
	}
	
	//입출금통장상세
	@GetMapping(value="/accountDetail/{acNumber}")
	public List<TransferDTO> accountDetail(@PathVariable("acNumber") Long acNumber)
			throws ServletException, IOException {
		logger.info("<<< url - accountDetail >>>");
		
		List<TransferDTO> list = service.accountDetail(acNumber);
		
		System.out.println(list);
		return list;
	}
	
	//예금계좌조회
	// http://localhost:8081/depositAccount/{id}
	@GetMapping(value="/depositAccount/{id}")
	public List<DepositAccountDTO> depositAccountList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< url - depositAccount() >>>");
		
		List<DepositAccountDTO> list = service.depositAccountList(id);
		System.out.println(list);
		System.out.println(id);
		return list;
	}
	
	// http://localhost:8081/depositDetail/{dPdName}/{id}
	// 예금계좌상세
	@GetMapping(value="/depositDetail/{acNumber}")
	public List<TransferDTO> depositDetail(@PathVariable("acNumber") Long acNumber)
			throws ServletException, IOException {
		logger.info("<<< url - depositDetail() >>>");
		System.out.println("acNumber:"+ acNumber);
		List<TransferDTO> list = service.depositDetail(acNumber);
		System.out.println(list);
		
		return list;
	}
	
	//적금계좌조회
	@GetMapping(value="/savingAccount/{id}")
	public List<SavingAccountDTO> savingAccountList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< url - savingAccount() >>>");
		
		List<SavingAccountDTO> list = service.savingAccountList(id);
		
		System.out.println(id);
		System.out.println(list);
		
		return list;
	}
	
	//적금통장상세
	@GetMapping(value="/savingDetail/{acNumber}")
	public List<TransferDTO> savingDetail(@PathVariable("acNumber") Long acNumber)
			throws ServletException, IOException {
		logger.info("<<< url - savingDetail >>>");
		
		List<TransferDTO> list = service.savingDetail(acNumber);
		
		System.out.println(list);
		return list;
	}
	
	//대출계좌조회
	@GetMapping(value="/loanAccount/{id}")
	public List<LoanAccountDTO> loanAccountList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< url - loanAccount() >>>");
		
		List<LoanAccountDTO> list = service.loanAccountList(id);
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
		logger.info("<<< url - transferList() >>>");
		
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
	//휴면계좌조회
	@GetMapping(value="/sleepList/{id}")
	public List<AccountDTO> sleepList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("<<< url - sleepList() >>>");
		
		List<AccountDTO> list = service.sleepList(id);
		System.out.println(list);
		
		return list;
	}
	
	//휴면계좌해지
	@GetMapping(value="/sleepRelease/{acNumber}")
	public void sleepRelease(@PathVariable("acNumber") long acNumber)
			throws ServletException, IOException {
		logger.info("<<< url - sleepRelease() >>>");
		service.sleepRelease(acNumber);
		
		
		
	}
	
	//===================[관리자]=====================
	@GetMapping(value="/adminSaving")
	public List<SavingAccountDTO> adminSaving(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - adminSaving() >>>");
		
		List<SavingAccountDTO> list = service.adminSaving(req, model);
		return list;
	}
	
	@GetMapping(value="/adminDeposit")
	public List<DepositAccountDTO> adminDeposit(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - adminDeposit() >>>");
		
		List<DepositAccountDTO> list = service.adminDeposit(req,model);
		return list;
	}
	
	@GetMapping(value="/adminAccount")
	public List<AccountDTO> adminAccount(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - adminAccount >>>");
		
		List<AccountDTO> list = service.adminAccount(req, model);
		
		System.out.println(list);
		return list;
	}
	
	@GetMapping(value="/adminLoan")
	public List<LoanAccountDTO> adminLoan(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - adminLoan >>>");
		
		List<LoanAccountDTO> list = service.adminLoan(req, model);
		
		System.out.println(list);
		return list;
	}
	
	//휴면계좌조회
	@GetMapping(value="/adminSleep")
	public List<AccountDTO> adminSleep(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - adminSleep() >>>");
		
		List<AccountDTO> list = service.adminSleep(req, model);
		System.out.println(list);
		
		return list;
	}
	
	//휴면계좌해지
	@GetMapping(value="/adminSleepRelease/{acNumber}")
	public void adminSleepRelease(@PathVariable("acNumber") long acNumber)
			throws ServletException, IOException {
		logger.info("<<< url - adminSleepRelease() >>>");
		service.adminSleepRelease(acNumber);
		
	}


	
}
