package com.pigbank.project.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.pigbank.project.dao.LeeMapper;
import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.TransferDTO;

@Service
public class LeeServiceImpl implements LeeService{

	@Autowired
	private LeeMapper dao;
	
	@Override
	public List<AccountDTO> accountList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		String id = "hong1234";
		System.out.println("dao : " + dao.accountList(id));
		return dao.accountList(id);
	}

	@Override
	public void InsertTransfer(TransferDTO dto) 
			throws ServletException, IOException {
//		출금
		String tType = "출금";
		dto.setTType(tType);
		// acNumber : 11022456542
		// tdeposit : 21024565488
		System.out.println("service dto : " + dto);
		dao.insertTransfer(dto);
		dto.getAcNumber();
		dto.getTAmount();
	
		dao.updateAccount(dto);
		
//		입금
		String tType2 = "입금";
		dto.setTType(tType2);
		
		// acNumber : 21024565488
		// tdeposit : 11022456542
		
		// 값 저장
		long tmp = dto.getAcNumber();
		String tmp2 = dto.getMyMemo();
		dto.setMyMemo(dto.getYourMemo());
		dto.setYourMemo(tmp2);
		dto.setAcNumber(dto.getTDepositnum());
		dto.setTDepositnum(tmp);
		
		dao.insertTransfer(dto);
		dao.updateAccountnext(dto);
	}

}
