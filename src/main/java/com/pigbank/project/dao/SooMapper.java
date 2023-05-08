package com.pigbank.project.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.LoanAccountDetailDTO;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.LoanRequestDTO;
import com.pigbank.project.dto.LoanWillPayDTO;

@Mapper
public interface SooMapper {
	
	// 대출 상품 리스트
	public List<LoanProductDTO> showPdLoantList();
	
	// 대출상품 추가
	public void insertPdLoan(LoanProductDTO loanProdctDTO);
	
	// 대출상품 조회(상세)
	public LoanProductDTO selectProduct(String lpdName);
	
	// 대출상품 수정
	public void updateProduct(LoanProductDTO loanProdctDTO);
	
	// 대출상품 삭제
	public void deleteProduct(String lpdName);
	
	// 대출상품 신청
	public void requestProduct(LoanRequestDTO loanRequestDTO);
	
	// 대출 심사 결과 조회
	public List<LoanRequestDTO> showLoanStateList(String id);
	
	// 대출 신청 목록 조회
	public List<LoanRequestDTO> showLoanReqList();
	
	// 대출 신청 승낙
	public void updateLoanAccept(int lreqNum);
	
	// 대출 신청 거절
	public void updateLoanRefuse(HashMap<String, Object> map);
	
	// 대출 계좌 생성 1
	public void createAccount(int lreqNum);
	
	// 대출 계좌 생성 2
	public void createLaccount(int lreqNum);
	
	// 대출 상환 스케쥴 생성
	// 1-1. 값 가져오기
	public LoanRequestDTO getPayInfo(int lreqNum);
	
	// 1-2. 스케쥴 테이블에 추가
	public void insertLoanPaySchedule(LoanWillPayDTO loanWillPayDTO);
	
	// 대출 상환 스케쥴 조회
	public List<LoanWillPayDTO> showLoanSchedule(int lnum);
	
	// 대출 납부 계좌 정보 조회
	public LoanWillPayDTO getLoanPayInfo(int lwillPayNum);
	
	// 대출 상환 스케쥴 업데이트
	public void updateLoanPaySchedule(LoanAccountDetailDTO loanAccountDetailDTO);
	
	// 대출 납부 거래내역 추가
	public void insertLoanDetail(LoanAccountDetailDTO loanAccountDetailDTO);
	
	// 대출 계좌 잔금 업데이트
	public void calcLoanBalance(LoanAccountDetailDTO loanAccountDetailDTO);
	
	// 입출금 계좌 잔금 업데이트
	public void calcDepositBalance(LoanAccountDetailDTO loanAccountDetailDTO);
	
	
	
}
