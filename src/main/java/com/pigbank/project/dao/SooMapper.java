package com.pigbank.project.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.LoanAccountDTO;
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
	
	// 대출상품 검색
	public List<LoanProductDTO> searchProduct(String lpdName);
		
	// 대출상품 신청
	public void requestProduct(LoanRequestDTO loanRequestDTO);
	
	// 대출 심사 결과 조회
	public List<LoanRequestDTO> showLoanStateList(String id);
	
	// 대출 신청 목록 조회
	public List<LoanRequestDTO> showLoanReqList();
	
	// 대출 신청 승낙
	public void updateLoanAccept(int lreqNum);
	
	// 대출 신청 거절
	public void updateLoanRefuse(Map<String, Object> map);
	
	// 대출 계좌 생성 1
	public void createAccount(Map<String, Object> map);
	
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
	
	// 대출금 납부
	// 1-1. 대출 상환 스케쥴 업데이트
	public void updateLoanPaySchedule(LoanAccountDetailDTO loanAccountDetailDTO);
	
	// 1-2. 대출 납부 거래내역 추가 (대출거래내역)
	public void insertLoanDetail(LoanAccountDetailDTO loanAccountDetailDTO);
	
	// 1-3. 대출 납부 거래내역 추가 (입출금통장 거래내역)
	public void insertTransfer1(LoanAccountDetailDTO loanAccountDetailDTO);

	// 1-4. 대출 계좌 잔금 업데이트
	public void calcLoanBalance(LoanAccountDetailDTO loanAccountDetailDTO);
	
	// 1-5. 입출금 계좌 잔금 업데이트
	public void calcDepositBalance(LoanAccountDetailDTO loanAccountDetailDTO);
	
	// 대출 중도상환 정보 조회
	public LoanAccountDTO getLoanCancelInfo(int lnum);
	
	// 대출 중도 상환 처리
	// 1.1 입출금 계좌에서 출금 처리
	public void updateAccountBalance(LoanAccountDTO loanAccountDTO);
	
	// 1.2 입출금 계좌 거래내역 추가
	public void insertTransfer2(LoanAccountDTO loanAccountDTO);
	
	// 1.3 대출계좌 잔액 업데이트
	public void updateLoanBalance(LoanAccountDTO loanAccountDTO);
	
	// 1.4 대출 스케쥴 업데이트
	public void updateLoanPayAll(LoanAccountDTO loanAccountDTO);
	
	
	
}
