package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.pigbank.project.dto.AccountDTO;

public interface LeeService {
	
	public List<AccountDTO> accountList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	public AccountDTO balance(long acNumber)
			throws ServletException,IOException;
}
