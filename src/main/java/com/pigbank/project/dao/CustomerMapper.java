package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AssetManagementDTO;
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;

@Mapper
public interface CustomerMapper {

	//회원가입
   public void insertCustomer(CustomerDTO customerDTO);
   
   //아이디 중복 체크
   public int duplicateId(String id);
   
   //이메일 인증
   public int selectKey(String key);
   
   //이메일 인증 시 등급 변경
   public void updateGrade(String key);
      
   //회원 인증
   public CustomerDTO cusById(String id);
   
   //회원 수정, 탈퇴인증
   public String passwordChk(String id);
   
   //회원 정보 불러오기
   public CustomerDTO customerDetail(String id);
   
   //회원 정보 업데이트
   public void cusUpdate(CustomerDTO customerDTO);
   
   //회원 탈퇴 신청
   public void cusDelete(String id);
   
   //-----------------------------------------------------------------------
   
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
   
   //고객 예금 검색 리스트
   public List<DepositProductDTO> depositSearch(String dpdName);
   
   //고객 예금 상품 상세페이지
   public DepositProductDTO pdDepositDetailInfo(String dpdName);
   
   //고객 예금 상품 가입시 계좌번호 불러오기
   public List<AccountDTO> cusAccountList(String id);
   
   //고객 예금 가입 - 전체 계좌 개설
   public void cusDepositOpenAll(DepositAccountDTO depositAccountDTO);
   
   //고객 예금 가입 - 예금 계좌 개설
   public void cusDepositOpen(DepositAccountDTO depositAccountDTO);
   
   //고객 예금 가입 - 입출금 통장에서 인출
   public void cusDepositOpenWithdraw(DepositAccountDTO depositAccountDTO);
   
   //고객 예금 가입 - 입출금 통장에 계좌이체 내역 추가
   public void normalToDepositTranfer(DepositAccountDTO depositAccountDTO);
   
   //고객 예금 가입 - 예금계좌에 계좌이체 내역 추가
   public void depositFromNormalTransfer(DepositAccountDTO depositAccountDTO);
   
   //---------------------------------------------------------------------

   //고객 예금 해지 예상 조회 
   public DepositAccountDTO cusDepositCxlExpInfo(int dNum);
   
   //고객 예금 해지 예상 조회 - 중도 해지시 중도해지 금리 불러오기
   public double depositMidCxlRate(int dNum);

   //고객 예금 해지 신청 - 전체 계좌 내용 변경
   public void cusDepositCxlReg(DepositAccountDTO depositAccountDTO);
   
   //고객 예금 해지 신청 - 예금 계좌 내용 번경
   public void cusDepositCxlRegD(DepositAccountDTO depositAccountDTO);
   
   //고객 예금 해지 신청 - 만기시 입금계좌로 입금
   public void cusDepositCxlPut(DepositAccountDTO depositAccountDTO);
 
   //고객 예금 해지 신청 - 입출금 통장에 계좌이체 내역 추가
   public void cxlNormalFromDepositTransfer(DepositAccountDTO depositAccountDTO);
   
   //고객 예금 해지 신청 - 예금계좌에 계좌이체 내역 추가
   public void cxlDepositToNormalTransfer(DepositAccountDTO depositAccountDTO);
   
   //---------------------------------------------------------------------

   //고객 자산 관리 페이지
   public List<AssetManagementDTO> assetsManagement1(String id);
   
   public List<AssetManagementDTO> assetsManagement2(String id);
}