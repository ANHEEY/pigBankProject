package com.pigbank.project.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AutoTransferDTO;
import com.pigbank.project.dto.AutoTransferListDTO;
import com.pigbank.project.dto.NoticeDTO;
import com.pigbank.project.dto.TransferDTO;

@Mapper
public interface LeeMapper {
	
	// 비교를 위한 전체계좌 조회
	public List<AccountDTO> allAccountList();
	
	// 계좌조회 
	public List<AccountDTO> accountList(String id);
	
	// 계좌조회 (계좌번호로)
	public AccountDTO selectoneaccount(long trsfacNumber);
	// 계좌이체 추가
	public void insertTransfer(TransferDTO dto);
	// 출금
	public int updateAccount(TransferDTO dto);
	// 입금
	public void updateAccountnext(TransferDTO dto);
	// 계좌 이체시 계좌의 마지막 거래날짜 업데이트
	public void updatelastDate(TransferDTO dto);
	
	// 자동이체등록
	public void autoInsertTransfer(AutoTransferDTO atdto);
	
	// 자동 이체 조회(전체)
	public List<AutoTransferDTO> autoTransferList();
	
	// 자동이체업데이트
	public void updateAutoTransfer(Map<String,Object> map);
	
	// 자동이체내역등록
	public void insertAutoTransferList(AutoTransferListDTO dto);
	
	// 자동이체 업데이트 주기
	public void updateAutoTransferCycle(Map<String,Object> map);
	
	// 자동 이체 조회(조건)
	public List<AutoTransferDTO> autoTransferCheck(Map<String,Object> map);
	
	// 자동 이체 조회(모든건)
	public List<AutoTransferDTO> autoTransferCheckall(Map<String,Object> map);
	
	// 자동 이체 해지
	public void autoTransferCancel(Map<String,Object> map);
	
	// 이체내역 조회(id)
	public List<AutoTransferListDTO> transferList(String id);
	
	// 자동이체 조회(id)
	public List<AutoTransferDTO> autoTransferListbyid(String id);
	
	// 자동이체 수정창 한건 조회
	public AutoTransferDTO selectOne(int aNum);
	
	// 자동이체 상세페이지에서 직접 수정
	public void updatedirectlyAutoTransfer(AutoTransferDTO dto);
	
	// 이체 한도 수정
	public void updatetrsfLimit(AccountDTO dto);
	
	// -- 공지사항
	public List<NoticeDTO> noticeList();
	
	// 공지사항 상세페이지
	public NoticeDTO checkonenotice(int nNum);
	
	// 공지사항 수정
	public void changenotice(NoticeDTO dto);
	
	// 공지사항 삭제
	public void deletenotice(int nNum);
	
	// 공지사항 추가
	public void addnotice(NoticeDTO dto);
	
	// 공지사항 수정
	public void updatecount(int nNum);
	
	// 공지사항 고객 상세페이지
	public NoticeDTO csboardDetail(int nNum);
}
