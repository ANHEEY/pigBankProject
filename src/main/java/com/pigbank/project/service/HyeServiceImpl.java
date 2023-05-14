package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import com.pigbank.project.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.pigbank.project.dao.HyeMapper;

@Service
public class HyeServiceImpl implements HyeService{
	
	@Autowired
	private HyeMapper dao;
	
	/*****************			회원 정보 목록			***************/
	public List<CustomerDTO> listCustomerAll(HttpServletRequest req, Model model)
		throws ServletException, IOException{
		System.out.println("========== 서비스 | listCustomerAll | ==========");
		
		List<CustomerDTO> list = dao.listCustomer();
		return list;
	}
	
	/*****************		고객 조회(회원 상세 페이지)		***************/
	@Override
	public CustomerDTO detailCustomer(String id) 
			throws ServletException, IOException {
		System.out.println("========== 서비스 | detailCustomer | ==========");
		
		CustomerDTO dto = dao.detailCustomer(id);
		return dto;
	}
	@Override
	public List<AccountDTO> detailAccountById(String id)
			throws ServletException, IOException {
		System.out.println("========== 서비스 | detailAccountById | ==========");
		
		List<AccountDTO> list = dao.detailAccountListById(id);
		return list;
	};
	
	/*****************		탈퇴 요청 고객 목록		***************/
	@Override
	public List<CustomerDTO> listCustomerWithdrawal(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		System.out.println("========== 서비스 | listCustomerWithdrawal | ==========");
		
		List<CustomerDTO> list = dao.listWithdrawalCustomer();
		return list;
	}
	/*****************		탈퇴 승인		***************/
	public void updateStateApproval(String id)
			throws ServletException,IOException{
		System.out.println("========== 서비스 | updateStateApproval | ==========");
		dao.updateStateApproval(id);
	};
	// 탈퇴 거절
	public void updateStateReject(String id)
			throws ServletException, IOException{
		System.out.println("========== 서비스 | updateStateApproval | ==========");
		dao.updateStateReject(id);

	};
	/**				펀드계좌 개설				**/
	// 고객 입출금 조회
	public List<AccountDTO> selectAccountById(String id)
			throws  ServletException, IOException{
		System.out.println("========== 서비스 | selectAccountById | ==========");

		List<AccountDTO> list = dao.selectAccountById(id);
		return list;
	};
	// 펀드 계좌 개설 & 입출금 계좌에 펀드 계좌 가입 금액 차감 & 이체내역 추가
	public void insertFundAccount(FundProductDTO dto)
			throws  ServletException,IOException{
		System.out.println("========== 서비스 | insertFundAccount | ==========");
		Random random = new Random();

		long num = random.nextInt(10000000);
		String randomN = String.format("%07d",num);
		String fAcNumber = "810"+randomN;
		System.out.println("정수변환 확인하기 : " + Long.parseLong(fAcNumber));
		// 펀드계좌번호
		dto.setFAcNumber(Long.parseLong(fAcNumber));

		TransferDTO transfer = new TransferDTO();
		transfer.setAcNumber(dto.getAcNumber());
		transfer.setTDepositnum(dto.getFAcNumber());
		transfer.setTAmount(dto.getFBalance());
		System.out.println("acNumber : "+transfer.getAcNumber() + "depositnum : "+transfer.getTDepositnum()+"tAmount : "+transfer.getTAmount());
		dao.insertFundAccount(dto);
		dao.deductAccountAmount(dto);
		dao.insertDepositFund(transfer);
	};
	/**				펀드계좌 조회 				**/
	// 고객 펀드계좌 목록
	public List<FundAccountDTO> listFundAccountById(String id)
			throws  ServletException, IOException{
		System.out.println("========== 서비스 | listFundAccountById | ==========");
		return dao.listFundAccountById(id);
	};
	// 계좌 상세 거래내역 보기
	public List<FundProductDTO> detailAccountByFNum(int fNum)
			throws  ServletException, IOException{
		System.out.println("========== 서비스 | detailAccountByFNum | ==========");
		return dao.detailAccountByFNum(fNum);
	};
	/**				보유한 펀드 조회 				**/
	// 고객별 펀드 보유내역 목록
	public List<FundProductDTO> havingFundById(String id)
			throws ServletException, IOException{
		System.out.println("========== 서비스 | havingFundById | ==========");
		return  dao.havingFundById(id);
	};
	/**				펀드상품 구매 				**/
	// 펀드상품 구매
	public void insertBuyFund(FundAPIDTO dto)
			throws  ServletException, IOException{
		System.out.println("========== 서비스 | insertBuyFund | ==========");
		String isinCd = dao.checkIsinCd(dto.getIsinCd());
		if (isinCd != null){
			// 보유내역 업데이트

		}
		else{
			// 거래내역 + 보유내역 추가
			dao.insertDetailTbl(dto);
			dao.insertHavingTbl(dto);
			// 펀드계좌 update => 잔액 차감하기
		}
	};

}
