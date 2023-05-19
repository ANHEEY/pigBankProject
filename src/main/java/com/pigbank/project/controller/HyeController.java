package com.pigbank.project.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import com.pigbank.project.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.pigbank.project.service.HyeServiceImpl;

@CrossOrigin(origins="**",maxAge=3600)
@RestController
public class HyeController {
	private static final Logger logger = LoggerFactory.getLogger(HyeController.class);

	@Autowired
	HyeServiceImpl service;
	
	/*****************			회원 정보 목록			***************/
	@GetMapping("/admin/listCustomerAll")
	public List<CustomerDTO> listCustomerAll(HttpServletRequest req, Model model)
		throws ServletException, IOException{
		logger.info("== URL || listCustomerAll == ");
		return service.listCustomerAll(req, model);
	}
	/*****************		고객 조회(회원 상세 페이지)		***************/
	@GetMapping("/admin/detailCustomer/{id}")
	public CustomerDTO detailCustomer(@PathVariable String id)
		throws ServletException , IOException{
		logger.info("== URL || detailCustomer == ");
		return service.detailCustomer(id);
	}
	@GetMapping("/admin/detailCustomerAccount/{id}")
	public List<AccountDTO> detailCustomerAccount(@PathVariable String id)
		throws ServletException , IOException{
		logger.info("== URL || detailCustomerAccount == ");
		return service.detailAccountById(id);
	}
	/*****************		탈퇴 요청 고객 목록		***************/
	@GetMapping("/admin/listWithdrawal")
	public List<CustomerDTO> listWithdrawal(HttpServletRequest req, Model model)
		throws ServletException, IOException{
		logger.info("== URL || listWithdrawal == ");
		return service.listCustomerWithdrawal(req, model);
	}
	/*****************		탈퇴 승인 (Update)		***************/
	@PutMapping("/admin/updateCustomerState/{id}")
	public void updateCustomer(@PathVariable String id, @RequestBody Map<String, Object> body)
			throws ServletException, IOException {
		logger.info("== URL || updateCustomer == ");
		service.updateStateApproval(id);
	}
	@PutMapping("/admin/rejectCustomerState/{id}")
	public void rejectCustomer(@PathVariable String id, @RequestBody Map<String, Object> body)
		throws ServletException, IOException{
		logger.info("=== url | rejectCustomer ==");
		service.updateStateReject(id);
	}

	/*************				펀드계좌 개설 				******************/
	@GetMapping(value="/customer/selectAccountById/{id}")
	public List<AccountDTO> selectAccountById(@PathVariable String id)
		throws  ServletException, IOException{
		logger.info("=== url | selectAccountById ==");
		return service.selectAccountById(id);
	}
	@PostMapping(value = "/customer/insertFundAccount")
	public void insertFundAccount(@RequestBody FundProductDTO dto)
		throws ServletException,IOException{
		logger.info("=== url | insertFundAccount ==");
		service.insertFundAccount(dto);
	}

	/*************				펀드 거래 내역 			******************/
	// 펀드 계좌 목록 가져오기
	@GetMapping(value = "/customer/listFundAccount/{id}")
	public List<FundAccountDTO> listFundAccount(@PathVariable String id)
		throws  ServletException, IOException{
		logger.info("=== url | listFundAccount ==");

		return service.listFundAccountById(id);
	}
	// 펀드계좌 상세거래내역 목록 가져오기
	@GetMapping(value = "/customer/fundAccountDetail/{fnum}")
	public List<FundProductDTO> detailAccountByFNum(@PathVariable String fnum)
		throws  ServletException, IOException{
		logger.info("=== url | detailAccountByFNum ===");
		System.out.println("fNum : "+ fnum);
		int f_num = Integer.parseInt(fnum);
		System.out.println("fnum : " + fnum);

		return  service.detailAccountByFNum(f_num);
	}
	/*************				펀드 보유 내역 			******************/
	@GetMapping(value = "/customer/fundHavingList/{id}")
	public List<FundProductDTO> havingFundById(@PathVariable String id)
		throws  ServletException, IOException{
		logger.info("=== url | havingFundById ===");
		return  service.havingFundById(id);
	}
	/*************				펀드 매수			******************/
	@PostMapping(value = "/customer/fundBuy")
	public void insertBuyFund(@RequestBody FundProductDTO dto)
		throws ServletException, IOException{
		logger.info("=== url | insertBuyFund ===");
		service.insertBuyFund(dto);
	}
	/*************			펀드 보유내역 업데이트하여 목록에 가져오기 			******************/
	@PostMapping(value = "/customer/updateHavingFund")
	public void updateHavingFund(@RequestBody List<FundHavingDTO> list)
			throws ServletException, IOException {
		logger.info("=== url | insertBuyFund ===");
		System.out.println(list);
		String id = "";
		for (FundHavingDTO dto : list) {
			id = dto.getId();
			service.updateHaving(dto);
		}
	}
	@GetMapping(value = "/customer/fundUpdateHavingList/{id}")
	public List<FundProductDTO> fundUpdateHavingList(@PathVariable String id)
			throws  ServletException, IOException{
		logger.info("=== url | havingFundById ===");
		return  service.havingFundById(id);
	}
	/*************				펀드 매도			******************/
	@PostMapping(value = "/customer/fundSell")
	public void insertSellFund(@RequestBody FundProductDTO dto)
			throws ServletException, IOException{
		logger.info("=== url | insertBuyFund ===");
		service.insertSellFund(dto);
	}
}
