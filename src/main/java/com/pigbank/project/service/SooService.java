package com.pigbank.project.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.pigbank.project.dto.LoanAccountDTO;
import com.pigbank.project.dto.LoanAccountDetailDTO;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.LoanRequestDTO;
import com.pigbank.project.dto.LoanWillPayDTO;

public interface SooService {
	
	// 관리자 대출상품 관리
	// 대출상품 리스트
	public List<LoanProductDTO> pdLoanList(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	// 대출상품 추가
	public void pdLoandInsert(LoanProductDTO loanProdctDTO)
			throws ServletException,IOException;
	
	// 대출 상품 상세화면 
	public LoanProductDTO selectProduct(String lpdName)
			throws ServletException,IOException;
	
	// 대출 상품 수정
	public void editProduct(LoanProductDTO loanProdctDTO)
			throws ServletException,IOException;
	
	// 대출 상품 삭제
	public void deleteProduct(String lpdName)
			throws ServletException,IOException;
	
	// 고객 대출 업무
	// 대출 납부 처리
	public List<LoanProductDTO> searchLoan(String lpdName)
			throws ServletException, IOException;
		
	// 대출 상품 신청
	public void requestProduct(LoanRequestDTO loanRequestDTO)
			throws ServletException,IOException;
	
	// 대출 심사 결과 조회(고객용)
	public List<LoanRequestDTO> loanStateList(String id)
			throws ServletException, IOException;
	
	// 대출 신청 목록 조회(관리자용)
	public List<LoanRequestDTO> loanRequestList()
			throws ServletException, IOException;

	// 대출 신청 승인
	public void acceptLoan(int lreqNum)
			throws ServletException, IOException;
	
	// 대출 신청 거절
	public void refuseLoan(int lreqNum, String lreason)
			throws ServletException, IOException;
	
	// 대출 상환 스케쥴 계산
	public ArrayList<Map<String, Object>> calcLoanPaySchedule(int lreqNum)
			throws ServletException, IOException;
	
	// 대출 상환 스케쥴표 생성
	public void createLoanPaySchedule(Map<String, Object> map)
			throws ServletException, IOException;
	
	// 대출 납부 정보 
	public List<LoanWillPayDTO> loanScheduleList(int lnum)
			throws ServletException, IOException;
	
	// 대출 납부 계좌 정보
	public LoanWillPayDTO loanPayInfo(int lwillPayNum)
			throws ServletException, IOException;
	
	// 대출 납부 처리
	public void doLoanPay(LoanAccountDetailDTO loanAccountDetailDTO)
			throws ServletException, IOException;
	
	// 대출 중도상환 해지 정보 조회
	public LoanAccountDTO loanCancelInfo(int lnum)
			throws ServletException, IOException;
	
	// 대출 중도 해지
	public void loanCancel(LoanAccountDTO loanAccountDTO)
			throws ServletException, IOException;
	
}
