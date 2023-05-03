package com.pigbank.project.service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pigbank.project.dao.CustomerMapper;
import com.pigbank.project.dto.AssetManagementDTO;
import com.pigbank.project.dto.CredentialsDTO;
import com.pigbank.project.dto.CustomerDTO;
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
	
	//고객 예금 상품 상세페이지
	@Override
	public DepositProductDTO pdDepositDetailInfoAction(String dpdName) {
		System.out.println("service - pdDepositDetailInfoAction");
		
		return dao.pdDepositDetailInfo(dpdName);
	}

	//--------------------------------------------------------------------
	
	//고객 자산 관리 페이지
	@Override
	public List<AssetManagementDTO> assetsManagementAction(String id) {
		System.out.println("service - assetsManagementAction");
		
		List<AssetManagementDTO> list1 = dao.assetsManagement1(id);
		List<AssetManagementDTO> list2 = dao.assetsManagement2(id);
		
		return null;
	}





}