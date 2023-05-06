package com.pigbank.project.service;

import java.nio.CharBuffer;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pigbank.project.dao.CustomerMapper;
import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AssetManagementDTO;
import com.pigbank.project.dto.CredentialsDTO;
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;
import com.pigbank.project.exception.AppException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService{

   @Autowired
   private PasswordEncoder passwordEncoder;
   
   @Autowired
   private CustomerMapper dao;
   
   //회원가입
   @Override
   public void insertCustomerAction(CustomerDTO customerDTO) {
      System.out.println("service - insertCustomer");
      System.out.println("customerDTO : "+customerDTO);
      String encryptPwd = passwordEncoder.encode(customerDTO.getPwd());
      System.out.println("encryptPwd : "+encryptPwd);
      customerDTO.setPwd(encryptPwd);
      
      dao.insertCustomer(customerDTO);
   }
   
   //아이디 중복 확인
	@Override
	public int duplicateIdAction(String id) {
		System.out.println("service - duplicateIdAction");
		
		return dao.duplicateId(id);
	}

   //회원 로그인
   @Override
   public CustomerDTO loginCustomerAction(CustomerDTO customerDTO) {
      System.out.println("service - loginCustomerAction");
      return null;
   }
   
   //회원 인증
	@Override
	public CustomerDTO cusById(String id) {
		System.out.println("service - cusById");		
		
		return dao.cusById(id);
	}
	
	//로그인
	@Override
	public CustomerDTO login(CredentialsDTO credentialsDTO) {
		System.out.println("service - login");		
		
		CustomerDTO customerDTO = dao.cusById(credentialsDTO.getId());
		
		if(passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.getPwd()),customerDTO.getPwd())){
			return customerDTO;
		}
		
		throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
	}
   
   //회원 수정, 탈퇴 전 인증
	@Override
	public int cusCertificationAction(CustomerDTO customerDTO) {
		System.out.println("service - cusCertificationAction");
		System.out.println("customerDTO : "+customerDTO);
		//Bcrypt matches 메서드 불러서 비밀번호 체크해야함
		String encryptPwd = dao.passwordChk(customerDTO.getId());
		System.out.println("encryptPwd : "+encryptPwd);
		if(passwordEncoder.matches(customerDTO.getPwd(), encryptPwd)) {
			return 1;
		}else {
			return 0;
		}
	}
   
   //회원 정보 불러오기
	@Override
	public CustomerDTO customerDetailAction(String id) {
		System.out.println("service - customerDetailAction");
		
		return dao.customerDetail(id);
	}

	//회원 정보 업데이트
	@Override
	public void cusUpdateAction(CustomerDTO customerDTO) {
		System.out.println("service - cusUpdateAction");
		
		System.out.println("customerDTO : "+customerDTO);
	    String encryptPwd = passwordEncoder.encode(customerDTO.getPwd());
	    System.out.println("encryptPwd : "+encryptPwd);
	    customerDTO.setPwd(encryptPwd);
		
		dao.cusUpdate(customerDTO);
	}
	
	//회원 탈퇴 신청
	@Override
	public void cusDeleteAction(String id) {
		System.out.println("service - cusDeleteAction");
		
		dao.cusDelete(id);
	}   
   //관리자 예금 상품 등록
   @Override
   public void depositPdSaveAction(DepositProductDTO depositProductDTO) {
      System.out.println("service - depositPdSave");
      
      System.out.println("depositProductDTO : "+depositProductDTO);
      
      dao.depositPdSave(depositProductDTO);      
   }

   //관리자 예금 상품 리스트
   @Override
   public List<DepositProductDTO> depositProductListAction() {
      System.out.println("service - depositProductListAction");
      
      return dao.depositProductList();
   }

   //관리자 예금 상품상세페이지
   @Override
   public DepositProductDTO depositPdDetailAction(String dpdName) {
      System.out.println("service - depositPdDetail");
      
      return dao.depositPdDetail(dpdName);
   }

   //관리자 예금 상품 수정
	@Override
	public void depositPdUpdateAction(DepositProductDTO depositProductDTO) {
		 System.out.println("service - depositPdUpdateAction");
		 
		 dao.depositPdUpdate(depositProductDTO);
	}

	//관리자 예금 상품 삭제
	@Override
	public void depositPdDeleteAction(String dpdName) {
		System.out.println("service - depositPdDeleteAction");
		
		dao.depositPdDelete(dpdName);
	}

	//---------------------------------------------------------------------------------------
	
	//고객 예금 상품 리스트
	@Override
	public List<DepositProductDTO> pdDepositListAction() {
		System.out.println("service - pdDepositListAction");
		
		return dao.pdDepositList();
	}
	
	//고객 예금 검색 리스트
	@Override
	public List<DepositProductDTO> depositSearchAction(String dpdName) {
		System.out.println("service - depositSearchAction");
		
		return dao.depositSearch(dpdName);
	}
	
	//고객 예금 상품 상세페이지
	@Override
	public DepositProductDTO pdDepositDetailInfoAction(String dpdName) {
		System.out.println("service - pdDepositDetailInfoAction");
		
		return dao.pdDepositDetailInfo(dpdName);
	}
	
	//고객 예금 상품 가입시 계좌 번호 불러오기
	@Override
	public List<AccountDTO> cusAccountListAction(String id) {
		System.out.println("service - cusAccountListAction");
		
		return dao.cusAccountList(id);
	}
	
	//고객 예금 가입 - 전체 계좌 개설
	@Override
	public void cusDepositOpenAllAction(DepositAccountDTO depositAccountDTO) {
		System.out.println("service - cusDepositOpenAllAction");
		
        Random rand = new Random();
        int n = rand.nextInt(10000000);
        String randNum = String.format("%07d", n);
		String acNumber ="210"+randNum;
		System.out.println("acNumber : "+Integer.parseInt(acNumber));
		
		depositAccountDTO.setAcNumber(Integer.parseInt(acNumber));
		
		LocalDate today = LocalDate.now();		
		int dPeriod = depositAccountDTO.getDperiod();
		LocalDate addedDate = today.plus(dPeriod, ChronoUnit.MONTHS);
		depositAccountDTO.setDendDate(java.sql.Date.valueOf(addedDate));
				
		dao.cusDepositOpenAll(depositAccountDTO);
		dao.cusDepositOpen(depositAccountDTO);
		dao.cusDepositOpenWithdraw(depositAccountDTO);
	}

	//--------------------------------------------------------------------
	
	//고객 자산 관리 페이지1
	@Override
	public String assetsManagementAction1(String id) {
		System.out.println("service - assetsManagementAction");
		
		List<AssetManagementDTO> list = dao.assetsManagement1(id);

		System.out.println("list: "+list);
		
		StringBuilder resultBuilder = new StringBuilder();
		resultBuilder.append("[");
		for (int i = 0; i < list.size(); i++) {
		    String acType = list.get(i).getAcType();
		    long acBalance = list.get(i).getAcBalance();
		    resultBuilder.append("['").append(acType).append("',").append(acBalance).append("]");
		    if (i < list.size() - 1) {
		        resultBuilder.append(",");
		    }
		}
		resultBuilder.append("]");

		String result = resultBuilder.toString();
	    
		System.out.println("result : "+result);
		
		return result;
	}

	//고객 자산 관리 페이지2
	@Override
	public List<AssetManagementDTO> assetsManagementAction2(String id) {
		System.out.println("service - assetsManagementAction");

		List<AssetManagementDTO> list2 = dao.assetsManagement2(id);
		return null;
	}


}