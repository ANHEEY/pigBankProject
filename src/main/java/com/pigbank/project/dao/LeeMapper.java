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
	
	// 비교를 위한 전체계좌 조회
	public List<AccountDTO> allAccountList();
	
	// 계좌조회 
	public List<AccountDTO> accountList(String id);
	
	public void insertTransfer(TransferDTO dto);
	// 출금
	public void updateAccount(TransferDTO dto);
	
	// 입금
	public void updateAccountnext(TransferDTO dto);
	
	// 자동이체등록
	public void autoInsertTransfer(AutoTransferDTO atdto);
	
	// 자동 이체 조회(전체)
	public List<AutoTransferDTO> autoTransferList();
	
	// 자동이체업데이트
	public void updateAutoTransfer(Map<String,Object> map);
	
	// 자동이체 업데이트 주기
	public void updateAutoTransferCycle(Map<String,Object> map);
	
	// 자동 이체 조회(조건)
	public List<AutoTransferDTO> autoTransferCheck(Map<String,Object> map);
	
	// 자동 이체 조회(모든건)
	public List<AutoTransferDTO> autoTransferCheckall(Map<String,Object> map);
	
	// 자동 이체 해지
	public void autoTransferCancel(Map<String,Object> map);
	
	// 자동이체 수정창 한건 조회
	public AutoTransferDTO selectOne(int aNum);
	
	// 자동이체 상세페이지에서 직접 수정
	public void updatedirectlyAutoTransfer(AutoTransferDTO dto);
	
	public void updatetrsfLimit(AccountDTO dto);
}
