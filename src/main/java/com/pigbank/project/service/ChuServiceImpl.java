package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;


import com.pigbank.project.dao.ChuMapper;
import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;
import com.pigbank.project.dto.LoanAccountDTO;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;

@Service
public class ChuServiceImpl implements ChuService{

	@Autowired
	private ChuMapper dao;
	

	@Override
	public List<SavingProductDTO> savingList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		
		System.out.println("서비스 - 적금상품리스트");
		List<SavingProductDTO> list;
		list = dao.savingList();
		System.out.println(list);
		return list;
	}

	@Override
	public List<DepositProductDTO> depositList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - 예금상품리스트");
		List<DepositProductDTO> list;
		list = dao.depositList();
		
		return list;
	}
	
	@Override
	public List<LoanProductDTO> loanList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - 예금상품리스트");
		List<LoanProductDTO> list;
		list = dao.loanList();
		
		return list;
	}
	
	@Override
	public List<DepositAccountDTO> depositAccountList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - 예금계좌리스트");
		List<DepositAccountDTO> list;
		list = dao.depositAccountList();
		System.out.println("list : " + list);
		return list;
	}
	
	@Override
	public List<SavingAccountDTO> savingAccountList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - 적금계좌리스트");
		List<SavingAccountDTO> list;
		list = dao.savingAccountList();
		System.out.println("list : " + list);
		return list;
	}
	@Override
	public List<LoanAccountDTO> loanAccountList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - 대출계좌목록");
		List<LoanAccountDTO> list;
		list = dao.loanAccountList();
		System.out.println("list : " + list);
		return list;
	}

	@Override
	public List<LoanAccountDTO> loanState(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("서비스 - 대출심사조회");
		List<LoanAccountDTO> list;
		list = dao.loanAccountList();
		System.out.println("list : " + list);
		return list;
	}
	
	
	
	
}
