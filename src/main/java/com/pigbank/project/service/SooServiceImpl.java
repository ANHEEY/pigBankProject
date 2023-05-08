package com.pigbank.project.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.pigbank.project.dao.SooMapper;
import com.pigbank.project.dto.LoanAccountDetailDTO;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.LoanRequestDTO;
import com.pigbank.project.dto.LoanWillPayDTO;

@Service
public class SooServiceImpl implements SooService{

	@Autowired
	private SooMapper dao;
	
	// 관리자
	// 대출 상품 리스트
	@Override
	public List<LoanProductDTO> pdLoanList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		
		List<LoanProductDTO> list = dao.showPdLoantList();
		
		return list;
	}
	
	// 대출상품 추가
	@Override
	public void pdLoandInsert(LoanProductDTO loanProductDTO) 
			throws ServletException, IOException {
		System.out.println("service - pdLoanInsert");
	
		dao.insertPdLoan(loanProductDTO);
		
	}
	
	// 대출상품 1건 조회
	@Override
	public LoanProductDTO selectProduct(String lpdName) throws ServletException, IOException {
		System.out.println("service - selectProduct");
	
		return dao.selectProduct(lpdName);
	}

	// 대출상품 수정
	@Override
	public void editProduct(LoanProductDTO loanProdctDTO) throws ServletException, IOException {
		System.out.println("service - editProduct");
		
		dao.updateProduct(loanProdctDTO);
	}

	// 대출상품 삭제
	@Override
	public void deleteProduct(String lpdName) throws ServletException, IOException {
		System.out.println("service - deleteProduct");
		
		dao.deleteProduct(lpdName);
	}

	// 고객
	// 대출 상품 신청
	@Override
	public void requestProduct(LoanRequestDTO loanRequestDTO) throws ServletException, IOException {
		System.out.println("service - requestProduct");
		
		dao.requestProduct(loanRequestDTO);
		
	}

	// 심사결과 조회
	@Override
	public List<LoanRequestDTO> loanStateList(String id)
			throws ServletException, IOException {
		System.out.println("service - loanStateList");
						
		List<LoanRequestDTO> list = dao.showLoanStateList(id);
		
		return list;
	}

	@Override
	public List<LoanRequestDTO> loanRequestList() throws ServletException, IOException {
		System.out.println("service - loanRequestList");
		
		List<LoanRequestDTO> list = dao.showLoanReqList();
		
		return list;
	}

	// 대출 신청 승인
	@Override
	public void acceptLoan(int lreqNum) throws ServletException, IOException {
		System.out.println("service - acceptLoan");
		
		// 심사 결과 업데이트
		dao.updateLoanAccept(lreqNum);
		
		// 대출계좌 생성
		dao.createAccount(lreqNum);
		dao.createLaccount(lreqNum);
		
	}

	// 대출 신청 거절
	@Override
	public void refuseLoan(int lreqNum, String lreason) throws ServletException, IOException {
		System.out.println("service - refuseLoan");
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("lreqNum", lreqNum);
		map.put("lreason", lreason);
		
		dao.updateLoanRefuse(map);
	}

	// 대출 상환 스케쥴 계산
	@Override
	public ArrayList<Map<String, Object>> calcLoanPaySchedule(int lreqNum) throws ServletException, IOException {
		System.out.println("service - calcLoanPaySchedule");
		// 계산에 필요한 값들 가져오기 (대출상환방법, 대출금액, 대출금리, 대출기간)
		LoanRequestDTO dto = dao.getPayInfo(lreqNum);
		
		String ltype = dto.getLtype(); // 대출상환종류
		int lprincipal = dto.getLprincipal(); // 대출금액
		double lrate = dto.getLrate(); // 대출금리
		int lperiod = dto.getLperiod() * 12; // 대출기간(년 -> 월)
		
		// list 생성
		ArrayList<Map<String, Object>> list = null;
	    
		// 원리금균등분할상환 계산
		if(ltype.equals("원리금균등분할상환")) {
		    double m = lrate * 0.01 / 12;  // 월이자율 
		    double rm = Math.pow(1+m, lperiod); // (1+m)의 개월수 거듭제곱
		    double bunja = lprincipal * m * rm;
		    double bunmo = rm - 1;
		    
		    int lmonTotal = (int)Math.round(bunja/bunmo); // 매월 상환액 반올림 (원금 + 이자)

		    int lmonRate = 0; // 월이자액 
		    int balance = lprincipal; // 대출잔액
		    
		    // 리스트 생성
		    list = new ArrayList<Map<String, Object>>();
		    
		    for(int i=1; i<=lperiod; i++) {
		    	// 해쉬맵 생성
		    	Map<String, Object> map = new HashMap<String, Object>();
		    	
		    	lmonRate = (int) Math.round(balance * m); // 월이자액
		    	int lmonPrice = (int)Math.round(lmonTotal - lmonRate); //월상환원금
		    	balance -= lmonPrice; // 갚아야할 대출 원금 잔액
		    	
		    	// 회차당 상환정보 넣기
		    	map.put("lpayTurn", i); //회차
		    	map.put("lmonRate", lmonRate); 
		    	map.put("lmonPrice", lmonPrice); 
		    	map.put("lmonTotal", lmonTotal); 
		    	map.put("balance", balance); // 상환후 대출잔액
		    	
		    	// 리스트에 각 회차당 정보 차례대로 넣기
		    	list.add(map);
		    	System.out.println("원리금 균등 : " + map);
		    }
		} 
		
		// 원금균등분할상환 계산
		else if(ltype.equals("원금균등분할상환")) {
		    int lmonPrice = Math.round(lprincipal / lperiod);  // 월 상환 원금 
		    double m = lrate * 0.01 / 12; // 월이자율
		    
		    int lmonTotal = 0;
		    int balance = lprincipal; // 내야하는 대출 원금 잔액
		    int lmonRate = 0; // 월이자액 
		    
		    // 리스트 생성
		    list = new ArrayList<Map<String, Object>>();
		    
		    for (int i = 1; i <= lperiod; i++) {
		        // 해쉬맵 생성
		        Map<String, Object> map = new HashMap<String, Object>();
		      
		        lmonRate = (int) Math.round(balance * m); // 남은 상환 원금에 대한 월이자액
		        lmonTotal = lmonRate + lmonPrice; // 월 상환금
		        balance -=  lmonPrice; // 상환후 대출 잔액
		      
		        // 회차당 상환정보 넣기
		        map.put("lpayTurn", i); //회차
		        map.put("lmonRate", lmonRate); 
		        map.put("lmonPrice", lmonPrice); 
		        map.put("lmonTotal", lmonTotal); 
		      
		        map.put("balance", balance); // 상환후 대출잔액
		   	    
		        // 리스트에 각 회차당 정보 차례대로 넣기
		        list.add(map);
		        System.out.println("원금 균등 : " + map);
	        }        
		}
		
		else {
			// 리스트 생성
		    list = new ArrayList<Map<String, Object>>();
		    
			double m = lrate * 0.01 / 12; // 월이자율
			int lmonRate = (int) Math.round(lprincipal * m); // 월이자액
			
			for(int i = 1; i <= lperiod; i++) {
				// 해쉬맵 생성
				Map<String, Object> map = new HashMap<String, Object>();
				
				// 만기 전달 까지 계산
				if(i < lperiod) {
					map.put("lpayTurn", i); //회차
			        map.put("lmonRate", lmonRate); 
			        map.put("lmonPrice", 0); 
			        map.put("lmonTotal", lmonRate); 
			        
			        list.add(map);
			        System.out.println("만기일시 : " + map);
				}
				else {
					map.put("lpayTurn", i); //회차
			        map.put("lmonRate", lmonRate); 
			        map.put("lmonPrice", lprincipal); 
			        map.put("lmonTotal", lprincipal + lmonRate); 
			        
			        list.add(map);
			        System.out.println("만기일시 : " + map);
				}
			}
		}
	return list;	
	}
	
	// 대출 신청 거절
	@Override
	public void createLoanPaySchedule(Map<String, Object> map) throws ServletException, IOException {
		System.out.println("service - createLoanPaySchedule");
		
		// 맵에 담긴 정보들을 꺼내서 dto에 담기 
		LoanWillPayDTO loanWillPayDTO = new LoanWillPayDTO();
		
		loanWillPayDTO.setLpayTurn((int)map.get("lpayTurn"));
		loanWillPayDTO.setLmonRate((int)map.get("lmonRate"));
		loanWillPayDTO.setLmonTotal((int)map.get("lmonTotal"));
		loanWillPayDTO.setLmonPrice((int)map.get("lmonPrice"));
		
		// mapper 호출
		dao.insertLoanPaySchedule(loanWillPayDTO);
		
	}

	// 대출 상환 스케쥴표 생성
	@Override
	public List<LoanWillPayDTO> loanScheduleList(int lnum) throws ServletException, IOException {
		System.out.println("service - loanScheduleList");
		
		return dao.showLoanSchedule(lnum);
	}

	// 대출 납부 정보 
	@Override
	public LoanWillPayDTO loanPayInfo(int lwillPayNum) throws ServletException, IOException {
		System.out.println("service - loanPayInfo");
		
		return dao.getLoanPayInfo(lwillPayNum);
	}

	@Override
	public void doLoanPay(LoanAccountDetailDTO loanAccountDetailDTO) throws ServletException, IOException {
		System.out.println("service - doLoanPay");
		
		System.out.println(loanAccountDetailDTO.getLmonTotal());
		System.out.println(loanAccountDetailDTO.getAcNumber());
		System.out.println(loanAccountDetailDTO.getLwillPayNum());
		
		// 대출 상환 스케쥴 업데이트
		System.out.println("service - doLoanPay - 대출상환 스케쥴 업데이트");
		dao.updateLoanPaySchedule(loanAccountDetailDTO);
	
		// 대출 거래 내역 생성
		System.out.println("service - doLoanPay - 대출 거래 내역 생성");
		dao.insertLoanDetail(loanAccountDetailDTO);
		
		// 대출계좌 잔금 계산
		System.out.println("service - doLoanPay - 대출계좌 잔금 계산");
		dao.calcLoanBalance(loanAccountDetailDTO);
		
		// 입출금계좌 잔금 계산
		System.out.println("service - doLoanPay - 입출금계좌 잔금 계산");
		dao.calcDepositBalance(loanAccountDetailDTO);		
	}
	
}
