package com.pigbank.project.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.LoanRequestDTO;

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
	
	// 대출 상환 스케쥴표 생성
	public ArrayList<Map<String, Object>> createLoanPaySchedule(int lreqNum);
	
}
