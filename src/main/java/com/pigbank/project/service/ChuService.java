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
		
	public List<AccountDTO> accountList(String id)
			throws ServletException,IOException;
	
	public List<TransferDTO> accountDetail(long acNumber)
			throws ServletException,IOException;
	
	public List<DepositAccountDTO>depositAccountList(String id)
			throws ServletException,IOException;
	
	public List<TransferDTO> depositDetail(long acNumber) 
			throws ServletException, IOException;
	
	public List<SavingAccountDTO>savingAccountList(String id)
			throws ServletException,IOException;
	
	public List<TransferDTO>savingDetail(long acNumber)
			throws ServletException,IOException;
	
	public List<LoanAccountDTO> loanAccountList(String id)
			throws ServletException,IOException;
	
	public List<LoanAccountDTO> loanState(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<TransferDTO> transferList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<ExchangeRateListDTO> exchangeList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	public List<AccountDTO> sleepList(String id) 
			throws ServletException, IOException;
	
	public void sleepRelease(long acNumber) 
			throws ServletException, IOException;
	
	//===================[관리자]=====================
	public List<SavingAccountDTO> adminSaving(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	public List<DepositAccountDTO> adminDeposit(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	public List<AccountDTO> adminAccount(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	public List<LoanAccountDTO> adminLoan(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	public List<AccountDTO> adminSleep(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	public void adminSleepRelease(long acNumber)
			throws ServletException, IOException;
	
    
    //마지막 거래일로부터 2년이 지난 계좌 불러오기
    public List<AccountDTO> breakAccountInfoAction();
    
    //마지막 거래일로부터 2년지난 통장 휴면처리
    public void accountSleepAction(long acNumber);
}
