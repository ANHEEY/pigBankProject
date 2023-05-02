package com.pigbank.project.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pigbank.project.dao.CustomerMapper;
import com.pigbank.project.dto.AssetManagementDTO;
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositProductDTO;

@Service
public class CustomerServiceImpl implements CustomerService{

   @Autowired
   private BCryptPasswordEncoder passwordEncoder;
   
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

   @Override
   public int loginCustomerAction(Map<String, String> map) {
      System.out.println("service - insertCustomer");
      return 0;
   }
   
   //회원 인증
	@Override
	public int cusCertificationAction(CustomerDTO customerDTO) {
		System.out.println("service - cusCertificationAction");
		//Bcrypt matches 메서드 불러서 비밀번호 체크해야함
		String encryptPwd = dao.passwordChk(customerDTO.getId());
		
		if(passwordEncoder.matches(customerDTO.getPwd(), encryptPwd)) {
			return 1;
		}
			return 0;		
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