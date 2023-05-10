package com.pigbank.project.dao;

import java.io.IOException;
import java.util.List;

import com.pigbank.project.dto.*;
import org.apache.ibatis.annotations.Mapper;

import javax.servlet.ServletException;

@Mapper
public interface HyeMapper {
	
	// 회원 정보 목록
	public List<CustomerDTO> listCustomer();

	// 고객 조회(회원 상세 페이지)
	public CustomerDTO detailCustomer(String id);
	public List<AccountDTO> detailAccountListById(String id);
	
	// 탈퇴 요청 고객 목록
	public List<CustomerDTO> listWithdrawalCustomer();

	// 탈퇴 승인
	public void updateStateApproval(String id);
	// 탈퇴요청거절
	public void updateStateReject(String id);

	/**		펀드 계좌 개설	**/
	// 고객 입출금 조회
	public List<AccountDTO> selectAccountById(String id);
	// 펀드 계좌 개설
	public void insertFundAccount(FundProductDTO dto);
	// 입출금 계좌에 펀드 계좌 가입 금액 차감
	public void deductAccountAmount(FundProductDTO dto);
	// 입출금통장 차감내역 이체내역에 추가
	public void insertDepositFund(TransferDTO transferdto);
	/**				펀드 거래내역  조회 				**/
	// 고객 펀드계좌 조회
	public List<FundAccountDTO> listFundAccountById(String id);
	// 계좌 상세내역 보기
	public List<FundProductDTO> detailAccountByFNum(int fNum);

	// 펀드 보유내역 조회
	public List<FundProductDTO> havingFundById(String id);
}
