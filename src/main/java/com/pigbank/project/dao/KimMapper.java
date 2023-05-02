package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;

@Mapper
public interface KimMapper {

	// [Admin]
	// 적금상품 목록
	public List<SavingProductDTO> sPdList();
	
	// 1건 조회
	public SavingProductDTO findByPdName(String spdname);
	
	// 적금상품 등록
	public void sPdInsert(SavingProductDTO sPdDTO);
	
	// 적금상품 수정
	public void sPdUpdate(SavingProductDTO sPdDTO);
	
	// 적금상품 삭제
	public void sPdDelete(String spdname);
	
	// [Customer]
	// Account 입출금 계좌 생성
	public void aPdInsert(AccountDTO aPdDTO);
	
	// SavingAccount 적금계좌생성
	public void custSPdInsert(SavingAccountDTO custSPdDTO);
	
}
