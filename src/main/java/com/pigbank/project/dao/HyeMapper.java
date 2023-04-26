package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.CustomerDTO;

@Mapper
public interface HyeMapper {
	
	// 회원 정보 목록
	public List<CustomerDTO> listCustomer();

//	// 고객 조회(회원 상세 페이지)
//	public List<AccountDTO> detailCustomer(String id);
//	
//	// 탈퇴 요청 고객 목록
//	public List<CustomerDTO> listWithdrawalCustomer();
}
