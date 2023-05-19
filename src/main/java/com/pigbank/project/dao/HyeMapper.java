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

	/** 펀드상품 구매 **/
	// 보유내역 확인하기
	public FundHavingDTO checkIsinCd(String isinCd);
	// 거래내역에 추가
	public void insertDetailTbl(FundProductDTO dto);
	// 보유내역에 추가
	public void insertHavingTbl(FundProductDTO dto);
	// 잔액 업데이트
	public void updateFundBalance(FundProductDTO dto);

	// 보유내역 데이터 가져오기
	public FundProductDTO updateHavingByFIsinCd(String fisinCd);

	// 펀드 보유내역 업데이트
	public void updateHaving(FundHavingDTO dto);

	/** 매도 */
	// 펀드계좌 가져오기
	public int selectAccountByIsinCd(FundProductDTO dto);
	// 펀드계좌 update => 잔액 증감하기
	public void sellAccountUpdate(FundProductDTO dto);

	// 거래내역에 추가
	public void sellInsert(FundProductDTO dto);

	// 보유내역 업데이트
	public void sellHavingUpdate(FundProductDTO dto);

	// 보유내역에서 count가 0이면 삭제
	public void deleteNoneCount();
}
