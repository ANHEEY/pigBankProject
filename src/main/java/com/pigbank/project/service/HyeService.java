package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import com.pigbank.project.dto.FundAccountDTO;
import com.pigbank.project.dto.FundProductDTO;
import org.springframework.ui.Model;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.CustomerDTO;

public interface HyeService {
	
	//회원 정보 목록
	public List<CustomerDTO> listCustomerAll(HttpServletRequest req, Model model)
		throws ServletException, IOException;
	
	//고객 조회(회원 상세 페이지)
	public CustomerDTO detailCustomer(String id)
		throws ServletException, IOException;
	
	public List<AccountDTO> detailAccountById(String id)
			throws ServletException, IOException;
	//탈퇴 요청 고객 목록
	public List<CustomerDTO> listCustomerWithdrawal(HttpServletRequest req, Model model)
			throws ServletException, IOException;

	// 탈퇴 승인
	public void updateStateApproval(String id)
		throws ServletException,IOException;
	// 탈퇴 거절
	public void updateStateReject(String id)
		throws ServletException, IOException;
	//고객 검색(나중에)

	/**				펀드계좌 개설				**/
	// 고객 입출금 조회
	public List<AccountDTO> selectAccountById(String id)
		throws  ServletException, IOException;

	// 펀드 계좌 개설
	public void insertFundAccount(FundProductDTO dto)
		throws  ServletException,IOException;

	/**				펀드계좌 조회 				**/
	// 고객 펀드계좌 목록
	public List<FundAccountDTO> listFundAccountById(String id)
		throws  ServletException, IOException;

	// 계좌 상세내역 보기
	public List<FundProductDTO> detailAccountByFNum(int fNum)
		throws  ServletException, IOException;
}
