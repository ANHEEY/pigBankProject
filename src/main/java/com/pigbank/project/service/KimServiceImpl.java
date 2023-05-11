package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
	public void deleteSpd(String spdname) throws ServletException, IOException {
		System.out.println("Service - (Admin)DeleteSPd");
		
		dao.sPdDelete(spdname);
	}
	// -----------------------------------------------------------------------------------------------------------------------------------------
	
	@Override // customer - 검색
	public List<SavingProductDTO> savingSearchAction(String spdname) throws ServletException, IOException {
		System.out.println("Service - (customer)SavingSearchAction");
		
		return dao.spdSearch(spdname);
	}
	
	// -----------------------------------------------------------------------------------------------------------------------------------------
	
	@Override // customer - 자유입출금계좌 개설
	public void insertAPd(AccountDTO aPdDTO) throws ServletException, IOException {
		System.out.println("Service - InsertAPd");
		
		dao.aPdInsert(aPdDTO);
	}

	// [custoemr_SavingProduct]
	@Override // 적금계좌생성
	public SavingAccountDTO insertCustAcc(SavingAccountDTO savingDTO) throws ServletException, IOException {
		System.out.println("Service - insertCustAcc");
		
		Random rand = new Random();
		int n = rand.nextInt(10000000);
		String randNum = String.format("%07d", n);
		String acNumber = "310"+randNum;
		System.out.println("acNumber " + acNumber);
		long acNum = Long.parseLong(acNumber);
				
		savingDTO.setAcNumber(acNum);
		
		// Account_tbl → SavingAccount_tbl
		dao.custAPdInsert(savingDTO); // 전체계좌 
		dao.custSPdInsert(savingDTO); // 적금계좌 개설

		// 적금계좌 생성 후 DTO를 리턴해서 컨트롤러로 전달 → 정재 서비스를 받아서 자동이체 등록
		return savingDTO; 
	}

	@Override // 적금 중도해지 상세페이지
	public SavingAccountDTO selectByClose(long acNumber) throws ServletException, IOException {
		System.out.println("Service - selectByClose(적금 중도해지 상세)");
		
		return dao.findByCloseDetail(acNumber);
	}

	@Override // 적금 중도해지
	public void deleteCustSaving(SavingAccountDTO savingDTO) throws ServletException, IOException {
		System.out.println("Service - deleteCustSaving(적금 중도해지)");
		
		
		dao.sAccClose(savingDTO); // 전체계좌 상태변경
		dao.sAccCloseSaving(savingDTO); // 적금계좌 상태변경
		dao.fSaivngPut(savingDTO); // 만기시 입금
		dao.accCxlTransfer(savingDTO); // 입출금계좌 이체내역
		dao.savingCxlTransfer(savingDTO); // 적금계좌 이체내역
		
	}

	@Override // 자동이체 번호 불러오기
	public int savingselectANum(SavingAccountDTO savingDTO) throws ServletException, IOException {
		System.out.println("Service - 자동이체 불러오기");
		
		long acNumber = savingDTO.getAcNumber();
		
		System.out.println("acNumber: " + acNumber);
		System.out.println("dao.selectANum(acNumber) : " + dao.selectANum(acNumber));
		return dao.selectANum(acNumber);
	}


	




}
