package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;
import com.pigbank.project.dto.ExchangeRateDTO;
import com.pigbank.project.dto.ExchangeRateDTO2;
import com.pigbank.project.dto.ExchangeRateListDTO;
import com.pigbank.project.dto.LoanAccountDTO;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;
import com.pigbank.project.dto.TransferDTO;




@Mapper
public interface ChuMapper {

	
	public List<SavingProductDTO> savingList();
	
	public List<DepositProductDTO> depositList();
	
	public List<LoanProductDTO>loanList();
	
	public List<AccountDTO> accountList(String id);
	
	public List<TransferDTO> accountDetail(Long acNumber);
	
	public List<DepositAccountDTO> depositAccountList(String id);
	
	public List<TransferDTO> depositDetail(long acNumber);
	
	public List<SavingAccountDTO> savingAccountList(String id);
	
	public List<LoanAccountDTO> loanAccountList(String id);
	
	public List<LoanAccountDTO> loanState();
	
	public List<TransferDTO> transferList();
	
	public List<ExchangeRateListDTO> exchangeList();
	
	
	
	
	
}
