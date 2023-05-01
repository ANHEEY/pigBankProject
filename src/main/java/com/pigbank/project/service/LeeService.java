package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AutoTransferDTO;
import com.pigbank.project.dto.TransferDTO;

public interface LeeService {
	
	public List<AccountDTO> accountList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public void InsertTransfer(TransferDTO dto)
			throws ServletException,IOException;

	public void AutoInsertTransfer(AutoTransferDTO dto)
			throws ServletException,IOException;
	
	public void checkScheduled()
			throws ServletException,IOException;
	
}
