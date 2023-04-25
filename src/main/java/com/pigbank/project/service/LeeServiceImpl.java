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

@Service
public class LeeServiceImpl implements LeeService{

	@Autowired
	private LeeMapper dao;
	
	@Override
	public List<AccountDTO> accountList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		String id = "hong1234";
		
		return dao.accountList(id);
	}

	@Override
	public AccountDTO balance(long acNumber) 
			throws ServletException, IOException {
		System.out.println("acNumber : " + acNumber);
		acNumber = 11022456542L;
		return dao.balance(acNumber);
	}

	
}
