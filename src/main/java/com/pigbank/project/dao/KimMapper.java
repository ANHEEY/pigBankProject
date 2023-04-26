package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.SavingProductDTO;

@Mapper
public interface KimMapper {

	// 입출금 계좌 생성
	public void accountInsert(AccountDTO acDTO);
	
	// 적금상품 목록
	public List<SavingProductDTO> sPdList();
	
	// 적금상품 등록
	public void sPdInsert(SavingProductDTO sPdDTO);
	
	// 적금상품 수정
	public void sPdUpdate(SavingProductDTO sPdDTO);
	
	// 적금상품 삭제
	public void sPdDelete(String sPdName);
	
}
