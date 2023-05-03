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
	
	public List<AutoTransferDTO> AutoTransferCheck(String acNumber,String aState)
			throws ServletException,IOException;
	
	public void autoTransferCancel(int aNum)
			throws ServletException,IOException;
	
	public AutoTransferDTO selectOne(int aNum)
			throws ServletException,IOException;
	
	public void updatedirectlyAutoTransfer(AutoTransferDTO dto)
			throws ServletException,IOException;
	
	public List<AccountDTO> allAccountList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public void updatetrsfLimit(AccountDTO dto)
			throws ServletException,IOException;
}
