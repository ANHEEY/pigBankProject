package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.AssetManagementDTO;
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositProductDTO;

@Mapper
public interface CustomerMapper {

	//회원가입
   public void insertCustomer(CustomerDTO customerDTO);
   
   //
   public CustomerDTO loginCustomer(String id);
   
   //회원 인증
   public String passwordChk(String id);
   
   //public int cusCertification(CustomerDTO customerDTO);
   
   //회원 정보 불러오기
   public CustomerDTO customerDetail(String id);
   
   //회원 정보 업데이트
   public void cusUpdate(CustomerDTO customerDTO);
   
   //회원 탈퇴 신청
   public void cusDelete(String id);
   
   //관리자 예금 상품 등록
   public void depositPdSave(DepositProductDTO depositProductDTO);
   
   //관리자 예금 상품 리스트
   public List<DepositProductDTO> depositProductList();
   
   //관리자 예금 상품상세페이지
   public DepositProductDTO depositPdDetail(String dpdName);

   //관리자 예금 상품 수정
   public void depositPdUpdate(DepositProductDTO depositProductDTO);
   
   //관리자 예금 상품 삭제
   public void depositPdDelete(String dpdName);
   
   //-------------------------------------------------------------------
   
   //고객 예금 상품 리스트
   public List<DepositProductDTO> pdDepositList();
   
   //고객 예금 상품 상세페이지
   public DepositProductDTO pdDepositDetailInfo(String dpdName);
   
   //---------------------------------------------------------------------

   //고객 자산 관리 페이지
   public List<AssetManagementDTO> assetsManagement1(String id);
   
   public List<AssetManagementDTO> assetsManagement2(String id);
}