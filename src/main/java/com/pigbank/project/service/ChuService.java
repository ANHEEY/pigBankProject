package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;
import com.pigbank.project.dto.ExchangeRateListDTO;
import com.pigbank.project.dto.LoanAccountDTO;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;
import com.pigbank.project.dto.TransferDTO;




public interface ChuService {
	
	public List<SavingProductDTO>savingList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<DepositProductDTO>depositList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<LoanProductDTO> loanList(HttpServletRequest req, Model model) 
			throws ServletException, IOException ;
		
	public List<AccountDTO> accountList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<DepositAccountDTO>depositAccountList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<SavingAccountDTO>savingAccountList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<LoanAccountDTO> loanAccountList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<LoanAccountDTO> loanState(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<TransferDTO> transferList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<ExchangeRateListDTO> exchangeList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
}
