package com.pigbank.project.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AutoTransferDTO;
import com.pigbank.project.dto.TransferDTO;

@Mapper
public interface LeeMapper {
	
	public List<AccountDTO> accountList(String id);
	
	public void insertTransfer(TransferDTO dto);
	// 출금
	public void updateAccount(TransferDTO dto);
	
	// 입금
	public void updateAccountnext(TransferDTO dto);
	
	// 자동이체등록
	public void autoInsertTransfer(AutoTransferDTO atdto);
	
	// 자동이체조회
	public List<AutoTransferDTO> autoTransferList();
	
	// 자동이체업데이트
	public void updateAutoTransfer(Map<String,Object> map);
	
	// 자동이체 업데이트 주기
	public void updateAutoTransferCycle(Map<String,Object> map);
}
