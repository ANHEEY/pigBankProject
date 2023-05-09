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
	// SavingProduct Search
	public List<SavingProductDTO> spdSearch(String spdname);
	
	// Account 입출금 계좌 개설
	public void aPdInsert(AccountDTO aPdDTO);
	
	// SavingAccount 적금계좌생성1(account_tbl => pk acNumber)
	public void custAPdInsert(SavingAccountDTO savingDTO);
	
	// SavingAccount 적금계좌생성2(s_account_tbl => pk sNum, fk acNumber)
	public void custSPdInsert(SavingAccountDTO savingDTO);
	
	// 입출금계좌에서 인출해서 적금계좌로
	public void custSavingOpenWithdraw(SavingAccountDTO savingDTO);
}
