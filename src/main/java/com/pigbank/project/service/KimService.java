package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.SavingProductDTO;

public interface KimService {

	// [account]
	// 등록
	public void insertAPd(AccountDTO aPdDTO) throws ServletException, IOException;

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
	public void deleteSpd(String sPdName) throws ServletException, IOException;
}
