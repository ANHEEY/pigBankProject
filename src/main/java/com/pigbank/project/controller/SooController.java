package com.pigbank.project.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.LoanAccountDTO;
import com.pigbank.project.dto.LoanAccountDetailDTO;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.LoanRequestDTO;
import com.pigbank.project.dto.LoanWillPayDTO;
import com.pigbank.project.service.SooServiceImpl;

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
	}
	
	// 대출상품 검색
	@GetMapping(value="/loan/loanSearch/{lpdName}")
	public List<LoanProductDTO> searchPdLoan(@PathVariable String lpdName)
		throws ServletException, IOException {
		logger.info("<<< url -searchPdLoan() >>>");
		
		return service.searchLoan(lpdName);
	}
		
	// 대출상품 신청
	@PostMapping(value="/loan/customer/addReq")
	public void requestPdLoan(@RequestBody LoanRequestDTO loanRequestDTO)
		throws ServletException, IOException {
		logger.info("<<< url - requestPdLoan() >>>");
		
		service.requestProduct(loanRequestDTO);
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
		
		// 상환 스케쥴 계산
		ArrayList<Map<String, Object>> list = service.calcLoanPaySchedule(lreqNum);
		
		// 상환 스케쥴표 생성
		// list 길이 만큼 for문을 돌린다.
		for(int i = 0; i<list.size(); i++) {
			// 맵에 담는다.
			HashMap<String, Object> map = (HashMap<String, Object>)list.get(i);
			service.createLoanPaySchedule(map);
		}	
		
	}
	
	// 대출 신청 거절
	@PutMapping("/loan/refuseLoan/{lreqNum}/{lreason}")
	public void refusePdLoan(@PathVariable int lreqNum, @PathVariable String lreason)		
		throws ServletException, IOException {
		logger.info("<<< url - refusePdLoan >>>");
		
		service.refuseLoan(lreqNum, lreason);
	}
	
	// 대출 상환 스케쥴 조회 
	@GetMapping(value="/loanAccount/listLoanSchedule/{lnum}")
	public List<LoanWillPayDTO> loanScheduleList(@PathVariable int lnum)
		throws ServletException, IOException {
			logger.info("<<< url - loanScheduleList >>>");
			
			List<LoanWillPayDTO> list = service.loanScheduleList(lnum);
			
			return list;
	}
	
	// 대출금 납부 정보 조회 
	@GetMapping(value="/loan/customer/getPayInfo")
	public LoanWillPayDTO getLoanPayInfo(@RequestParam int lwillPayNum)
		throws ServletException, IOException {
			logger.info("<<< url - loanScheduleList >>>");
			
		LoanWillPayDTO loanWillPayDTO = service.loanPayInfo(lwillPayNum);
		
		return loanWillPayDTO;
	}
	
	// 대출금 납부 처리
	@PostMapping(value="/loan/customer/updatePayStatus")
	public void updateLoanPayInfo(@RequestBody LoanAccountDetailDTO loanAccountDetailDTO)
		throws ServletException, IOException {
		logger.info("<<< url - updateLoanPayInfo >>>");
		
		service.doLoanPay(loanAccountDetailDTO);
	}
	
	
    // 대출 중도상환 정보 조회
    @GetMapping(value="/loanAccount/loanCancelInfo/{lnum}")
    public LoanAccountDTO getloanCancelInfo(@PathVariable int lnum) 
    	throws ServletException, IOException {
    	logger.info("<<< url - getloanCancelInfo >>>");
  
    	LoanAccountDTO loanAccountDTO = service.loanCancelInfo(lnum);
  
    	return loanAccountDTO; 
    
    }
    
    // 대출 중도상환 처리
    @PostMapping(value="/loan/customer/updatLoanCancel")
    public void updateLoanCancel(@RequestBody LoanAccountDTO loanAccountDTO) 
    	throws ServletException, IOException {
    	logger.info("<<< url - updateLoanCancel >>>");
  
    	service.loanCancel(loanAccountDTO);
    
    }
 
 
	

	
}
