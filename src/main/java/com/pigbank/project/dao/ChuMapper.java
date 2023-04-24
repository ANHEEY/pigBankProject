package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;
import com.pigbank.project.dto.LoanAccountDTO;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;




@Mapper
public interface ChuMapper {

	
	public List<SavingProductDTO> savingList();
	
	public List<DepositProductDTO> depositList();
	
	public List<LoanProductDTO>loanList();
	
	public List<DepositAccountDTO> depositAccountList();
	
	public List<SavingAccountDTO> savingAccountList();
	
	public List<LoanAccountDTO> loanAccountList();

	
}
