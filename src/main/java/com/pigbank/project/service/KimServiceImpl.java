package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.pigbank.project.dao.KimMapper;
import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;

@Service
public class KimServiceImpl implements KimService {

	@Autowired
	private KimMapper dao;
	
	@Override // Admin - 적금상품 목록
	public List<SavingProductDTO> listAllSPd(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("Service - (Admin)ListAllSPd");
		
		List<SavingProductDTO> list = dao.sPdList();
		return list;
	}

	@Override // admin - 1건 조회(상세페이지)
	public SavingProductDTO selectPdSaving(String spdname) throws ServletException, IOException {
		System.out.println("Service - (Admin)selectPdSaving");
		
		return dao.findByPdName(spdname);
	}
	
	@Override // Admin - 적금상품 등록
	public void insertSPd(SavingProductDTO sPdDTO) throws ServletException, IOException {
		System.out.println("Service - (Admin)InsertSPd");
		
		dao.sPdInsert(sPdDTO);
	}

	@Override // Admin- 적금상품 수정
	public void updateSPd(SavingProductDTO sPdDTO) throws ServletException, IOException {
		System.out.println("Service - (Admin)UpdateSPd");
		
		dao.sPdUpdate(sPdDTO);
	}

	@Override // Admin - 적금상품 삭제
	public void deleteSpd(String sPdName) throws ServletException, IOException {
		System.out.println("Service - (Admin)DeleteSPd");
		
		dao.sPdDelete(sPdName);
	}
	
	@Override // account - 자유입출금계좌 생성
	public void insertAPd(AccountDTO aPdDTO) throws ServletException, IOException {
		System.out.println("Service - InsertAPd");
		
		dao.aPdInsert(aPdDTO);
	}

	// [custoemr_SavingProduct]
	@Override // 적금계좌 생성
	public void insertCustSPd(SavingAccountDTO custSPdDTO) throws ServletException, IOException {
		System.out.println("Service - Customer InsertSPd");
		
	}

	

}
