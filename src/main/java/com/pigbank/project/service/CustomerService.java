package com.pigbank.project.service;

import java.util.List;
import java.util.Map;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AssetManagementDTO;
import com.pigbank.project.dto.CredentialsDTO;
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;

public interface CustomerService {

	//회원가입
	public void insertCustomerAction(CustomerDTO customerDTO);
	
	//아이디 중복 체크
	public int duplicateIdAction(String id);
   
	//회원 로그인
	public CustomerDTO loginCustomerAction(CustomerDTO customerDTO);
	
	//회원 인증
	public CustomerDTO cusById(String id);
	
	public CustomerDTO login(CredentialsDTO credentialsDTO);
   
	//회원 수정, 탈퇴 전 인증
	public int cusCertificationAction(CustomerDTO customerDTO);
   
	//회원 정보 불러오기
	public CustomerDTO customerDetailAction(String id);
   
	//회원 정보 업데이트
	public void cusUpdateAction(CustomerDTO customerDTO);
   
	//회원 탈퇴 신청
  	public void cusDeleteAction(String id);
   
  	//-----------------------------------------------------------------------------------------
  	
  	//관리자 예금 상품 등록
  	public void depositPdSaveAction(DepositProductDTO depositProductDTO);
   
  	//관리자 예금 상품 리스트
  	public List<DepositProductDTO> depositProductListAction();

  	//관리자 예금 상품상세페이지
  	public DepositProductDTO depositPdDetailAction(String dpdName);

  	//관리자 예금 상품 수정
  	public void depositPdUpdateAction(DepositProductDTO depositProductDTO);
   
  	//관리자 예금 상품 삭제
  	public void depositPdDeleteAction(String dpdName);
   
  	//-------------------------------------------------------------------------------------------
  	
  	//고객 예금 상품 리스트
  	public List<DepositProductDTO> pdDepositListAction();
  	
  	//고객 예금 검색 리스트
  	public List<DepositProductDTO> depositSearchAction(String dpdName);
   
  	//고객 예금 상품 상세페이지
  	public DepositProductDTO pdDepositDetailInfoAction(String dpdName);
   
  	//고객 예금 상품 가입시 계좌번호 불러오기
  	public List<AccountDTO> cusAccountListAction(String id);
  	
  	//고객 예금 가입
  	public void cusDepositOpenAllAction(DepositAccountDTO depositAccountDTO);
 
  	
  	//---------------------------------------------------------------------------------------------
  	
  	//고객 자산 관리 페이지
  	public String assetsManagementAction1(String id);
   
  	//고객 자산 관리 페이지2
  	public List<AssetManagementDTO> assetsManagementAction2(String id);
   
}