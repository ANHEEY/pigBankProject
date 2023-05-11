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
	
	// SavingAccount 적금 중도해지 조회
	public SavingAccountDTO findByCloseDetail(long acNumber);
	
	// SavingAccount 적금 중도해지 - 전체계좌 상태변경
	public void sAccClose(SavingAccountDTO savingDTO);
	
	// SavingAccount 적금 중도해지 - 적금계좌 상태변경
	public void sAccCloseSaving(SavingAccountDTO savingDTO);
	
	// SavingAccount 적금 중도해지 - 만기시 입금계좌로 입금 - > 자동이체 만기일까지. 그 이후에 돈 넣어줘야함.
	public void fSaivngPut(SavingAccountDTO savingDTO);
	
	// SavingAccount 적금 중도해지 - 입출금계좌 이체내역 추가
	public void accCxlTransfer(SavingAccountDTO savingDTO);
	
	// SavingAccount 적금 중도해지 - 적금계좌 이체내역 추가
	public void savingCxlTransfer(SavingAccountDTO savingDTO);
	
	// 자동이체 번호 불러오기
	public int selectANum(long acNumber);
	
}

