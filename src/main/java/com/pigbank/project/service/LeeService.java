package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AutoTransferDTO;
import com.pigbank.project.dto.AutoTransferListDTO;
import com.pigbank.project.dto.NoticeDTO;
import com.pigbank.project.dto.TransferDTO;

public interface LeeService {
	// 전체계좌 조회(비교를 위한)
	public List<AccountDTO> allAccountList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	
	// 계좌목록 조회
	public List<AccountDTO> accountList(String id)
			throws ServletException,IOException;
	
	// 단일건 계좌이체
	public void InsertTransfer(TransferDTO tdto)
			throws ServletException,IOException;
	
	// 다른은행 계좌이체
	public void InsertOtherTransfer(TransferDTO tdto)
			throws ServletException,IOException;
	
	// 자동이체 등록
	public void AutoInsertTransfer(AutoTransferDTO atdto)
			throws ServletException,IOException;
	
	// 스케쥴러로 시간마다 체크후 자동이체 및 자동이체 상태 변경
	public void checkScheduled()
			throws ServletException,IOException;
	// 자동이체 조회
	public List<AutoTransferDTO> AutoTransferCheck(String acNumber,String aState)
			throws ServletException,IOException;
	
	
	// 자동이체 해지
	public void autoTransferCancel(int aNum)
			throws ServletException,IOException;
	// id로 자동이체내역 조회
	public List<AutoTransferListDTO> transferList(String id)
			throws ServletException,IOException;
	// id로 자동이체 조회 
	public List<AutoTransferDTO> autoTransferList(String id)
			throws ServletException,IOException;
	// 자동이체(상세) 단건 조회 (상세페이지 고유번호)
	public AutoTransferDTO selectOne(int aNum)
			throws ServletException,IOException;
	// 자동이체 수정
	public void updatedirectlyAutoTransfer(AutoTransferDTO atdto)
			throws ServletException,IOException;
	// 이체한도 수정	
	public void updatetrsfLimit(AccountDTO dto)
			throws ServletException,IOException;
	// -- 공지사항 
	public List<NoticeDTO> noticeList(HttpServletRequest req, Model model)
			throws ServletException,IOException;
	// 공지사항상세페이지
	public NoticeDTO checkonenotice(int nNum)
			throws ServletException,IOException;
	// 공지사항 수정
	public void changenotice(NoticeDTO ndto)
			throws ServletException,IOException;
	// 공지사항 삭제
	public void deletenotice(int nNum)
			throws ServletException,IOException;
	// 공지사항 추가
	public void addnotice(NoticeDTO ndto)
			throws ServletException,IOException;
	// 고객 상세페이지(조회수를 위한)
	public NoticeDTO csboardDetail(int nNum)
			throws ServletException,IOException;
	
}
