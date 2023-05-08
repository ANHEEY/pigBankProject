package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;

import com.pigbank.project.dao.ChuMapper;
import com.pigbank.project.dao.Exchange;
import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;
import com.pigbank.project.dto.ExchangeRateDTO;
import com.pigbank.project.dto.ExchangeRateListDTO;
import com.pigbank.project.dto.LoanAccountDTO;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;
import com.pigbank.project.dto.TransferDTO;

@Service
public class ChuServiceImpl implements ChuService{

	@Autowired
	private ChuMapper dao;
	
	@Autowired
	private Exchange ex;
	

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
	public List<DepositAccountDTO> depositAccountList(String id) 
			throws ServletException, IOException {
		System.out.println("서비스 - 예금계좌리스트");
		List<DepositAccountDTO> list;
		list = dao.depositAccountList(id);
		System.out.println("list : " + list);
		return list;
	}
	
	@Override
	public List<TransferDTO> depositDetail(long acNumber) 
			throws ServletException, IOException {
		System.out.println("서비스 - 예금상세");
		List<TransferDTO> list;
		list = dao.depositDetail(acNumber);
		
		return list;
	}
	
	@Override
	public List<SavingAccountDTO> savingAccountList(String id) 
			throws ServletException, IOException {
		System.out.println("서비스 - 적금계좌리스트");
		List<SavingAccountDTO> list;
		list = dao.savingAccountList(id);
		System.out.println("list : " + list);
		return list;
	}
	@Override
	public List<LoanAccountDTO> loanAccountList(String id) 
			throws ServletException, IOException {
		System.out.println("서비스 - 대출계좌목록");
		List<LoanAccountDTO> list;
		list = dao.loanAccountList(id);
		System.out.println("list : " + list);
		return list;
	}

	@Override
	public List<LoanAccountDTO> loanState(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("서비스 - 대출심사조회");
		List<LoanAccountDTO> list;
		list = dao.loanState();
		System.out.println("list : " + list);
		return list;
	}

	@Override
	public List<AccountDTO> accountList(String id) throws ServletException, IOException {
		System.out.println("서비스 - 입출금통장조회");
		List<AccountDTO> list;
		list = dao.accountList(id);
		System.out.println("list : " + list);
		return list;
	}
	
	@Override
	public List<TransferDTO> accountDetail(Long acNumber) throws ServletException, IOException {
		System.out.println("서비스 - 입출금통장상세");
		List<TransferDTO> list;
		list = dao.accountDetail(acNumber);
		System.out.println("list : " + list);
		return list;
	}

	@Override
	public List<TransferDTO> transferList(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("서비스 - 이체내역조회");
		List<TransferDTO> list;
		list = dao.transferList();
		System.out.println("list : " + list);
		return list;
	}

	@Override
	public List<ExchangeRateListDTO> exchangeList(HttpServletRequest req, Model model) throws ServletException, IOException {
		System.out.println("서비스 - 환율조회");
		List<ExchangeRateListDTO> list;
		list = dao.exchangeList();
		System.out.println("list : " + list);
		
		return list;
	}

	
	
	
	
	
}
