package com.pigbank.project.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.TransferDTO;

@Mapper
public interface LeeMapper {
	
	public List<AccountDTO> accountList(String id);
	
	public void insertTransfer(TransferDTO dto);
	
	// 출금
	public void updateAccount(TransferDTO dto);
	// 입금
	public void updateAccountnext(TransferDTO dto);
	
}
