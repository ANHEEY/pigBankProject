package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

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
		System.out.println("service dto : " + dto);
		dao.insertTransfer(dto);
		
		
//		입금
		String tType2 = "입금";
		dto.setTType(tType2);
		
		// 값 저장
		long tmp = dto.getAcNumber();
		
		dto.setAcNumber(dto.getTDepositnum());
		dto.setTDepositnum(tmp);

		dao.insertTransfer(dto);
		
		
	}

}
