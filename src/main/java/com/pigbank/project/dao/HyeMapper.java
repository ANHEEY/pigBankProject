package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.CustomerDTO;

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
	// 탈퇴요청거부
	public void updateStateReject(String id);
}
