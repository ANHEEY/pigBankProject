package com.pigbank.project.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
		transfer.setTAmount(dto.getFbalance());
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
	public List<FundProductDTO> detailAccountByFNum(int fnum)
			throws  ServletException, IOException{
		System.out.println("========== 서비스 | detailAccountByFNum | ==========");
		return dao.detailAccountByFNum(fnum);
	};
	/**				보유한 펀드 조회 				**/
	// 고객별 펀드 보유내역 목록
	public List<FundProductDTO> havingFundById(String id)
			throws ServletException, IOException{
		System.out.println("========== 서비스 | havingFundById | ==========");
		return  dao.havingFundById(id);
	};
	/** 펀드상품 구매 **/
	// 펀드상품 구매
	public void insertBuyFund(FundProductDTO dto)
			throws ServletException, IOException{
		System.out.println("========== 서비스 | insertBuyFund | ==========");
		System.out.println(dto.getFisinCd());
		// 보유내역에 매수할 상품이 있는지 체크
		FundHavingDTO having = dao.checkIsinCd(dto.getFisinCd());
		System.out.println("total 1 : " + dto.getFtotal());
		System.out.println(having);

		// transnum생성
		LocalDateTime now =LocalDateTime.now();
		DateTimeFormatter format= DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String ftrans = now.format(format);
		dto.setFtransNum(Long.parseLong(ftrans));
		System.out.println("total 2 : " + dto.getFtotal());

		// 구매금액 ftotal 계산 => 새로 매수한 펀드상품의 원금
		//count * fundItems.clpr;
		int count = dto.getFcount();
		long clpr = dto.getFnowPrice();
		long total = count * clpr;
		dto.setFtotal(total);
		System.out.println("total 3: " + dto.getFtotal());
		if (having != null){
			// ** 보유내역 업데이트 ** //
			// 원금과 현재가를 가져온다.
			long principal = having.getFprincipal() + total;
			long nowPrice = having.getFnowPrice();
			// 평가손익 계산
			long nowProfit = nowPrice - principal;
			// 수익률 계산
			float profitRate = (float) nowProfit / principal * 100;
			dto.setFnowProfit(nowProfit);
			dto.setFprofit(profitRate);
		}
		else{
			System.out.println("// 펀드계좌 update => 잔액 차감하기");
			// 펀드계좌 update => 잔액 차감하기
			dao.updateFundBalance(dto);
			System.out.println("// 거래내역 + 보유내역 추가");
			// 거래내역 + 보유내역 추가
			dao.insertDetailTbl(dto);
			System.out.println("// 보유내역 추가");
			dao.insertHavingTbl(dto);
		}
	};
	// 펀드 보유내역 업데이트
	public void updateHaving(FundHavingDTO dto)
			throws ServletException,IOException{
		System.out.println("========== 서비스 | updateHaving | ==========");
		FundProductDTO data = new FundProductDTO();

		// 보유내역 데이터 가져오기
		data = dao.updateHavingByFIsinCd(dto.getIsinCd());
		// 수익률fProfit, 원금fPrincipal, 현재가fNowPrice, 평가손익fNowProfit, 평가금액fNowTotal, 보유수량 fhavingCnt
		float fProfit = data.getFprofit(); // 수익률
		long fPrincipal = data.getFprincipal(); // 원금
		long fNowPrice = data.getFnowPrice(); // 현재가
		long fNowProfit = data.getFnowProfit(); // 평가손익
		long fNowTotal = data.getFnowTotal(); // 평가금액
		long fBuyPrice = data.getFbuyPrice(); // 매수가격
		int fhavingCnt = data.getFhavingCnt(); // 보유개수
		System.out.println("평가금액 : "+ fNowTotal +" 평가손익 : "+ fNowProfit + " 수익률 : "+ fProfit);

		// 평가금액 = ( 현재가 * 수량 )
		fNowTotal = Integer.parseInt(dto.getClpr()) * fhavingCnt;
		// 평가손익 = (평가금액 - 원금)
		fNowProfit = fNowTotal - fPrincipal;
		// 수익률 = (평가손익 / 평가금액 ) * 100
		// Calculate profit percentage
		fProfit = (float) ((fNowProfit / (double) fNowTotal) * 100);
		System.out.println("평가금액 : "+ fNowTotal +" 평가손익 : "+ fNowProfit + " 수익률 : "+ fProfit);
		// 원금 (매수가격 * 매수수량 ) => 유지

		dto.setFnowPrice(fNowPrice);
		dto.setFprofit(fProfit);
		dto.setFnowProfit(fNowProfit);
		dto.setFprincipal(fPrincipal);
		dto.setFnowTotal(fNowTotal);
		dao.updateHaving(dto);
		System.out.println("========== 서비스 | 업데이트 완료 ==========");
	};
	/** 펀드상품 매도 **/
	public void insertSellFund(FundProductDTO dto)
			throws ServletException, IOException{
		System.out.println("========== 서비스 | insertSellFund | ==========");
		// 펀드 계좌 가져오기
		int fnum = dao.selectAccountByIsinCd(dto);
		dto.setFnum(fnum);
		// transnum생성
		LocalDateTime now =LocalDateTime.now();
		DateTimeFormatter format= DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String ftrans = now.format(format);
		dto.setFtransNum(Long.parseLong(ftrans));

		// 구매금액 ftotal 계산 => 매도한 펀드상품의 원금
		//count * fundItems.clpr;
		int count = dto.getFhavingCnt();
		long nowP = dto.getFnowPrice();
		long total = count * nowP;
		long nowTotal = dto.getFnowTotal()-total;
		dto.setFnowTotal(nowTotal);
		dto.setFtotal(total);

		// 펀드계좌 update => 잔액 증감하기
		dao.sellAccountUpdate((dto));
		// 거래내역에 추가
		dao.sellInsert(dto);
		// 보유내역 업데이트
		dao.sellHavingUpdate(dto);
		// 보유내역에서 count가 0이면 삭제
		dao.deleteNoneCount();
	};


}
