package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;


import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;

public interface KimService {

	// [savingProduct]
	// 목록
	public List<SavingProductDTO> listAllSPd(HttpServletRequest req, Model model) throws ServletException, IOException;
	
	// 1건 조회
	public SavingProductDTO selectPdSaving(String spdname) throws ServletException, IOException;
	
	// 등록
	public void insertSPd(SavingProductDTO sPdDTO) throws ServletException, IOException;

	// 수정
	public void updateSPd(SavingProductDTO sPdDTO) throws ServletException, IOException;
	
	// 삭제
	public void deleteSpd(String spdname) throws ServletException, IOException;

	// 상품검색
	public List<SavingProductDTO> savingSearchAction(String spdname) throws ServletException, IOException;

	// [account]
	// 입출금계좌 개설
	public void insertAPd(AccountDTO aPdDTO) throws ServletException, IOException;

	// [Customer_SavingAccount]
	// 적금계좌 생성
	public SavingAccountDTO insertCustAcc(SavingAccountDTO savingDTO) throws ServletException, IOException;
	
	// 적금 중도해지 조회
	public SavingAccountDTO selectByClose(long acNumber) throws ServletException, IOException; 
	
	// 중도해지
	public void deleteCustSaving(long acNumber) throws ServletException, IOException;
	
}
