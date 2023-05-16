package com.pigbank.project.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AutoTransferDTO;
import com.pigbank.project.dto.AutoTransferListDTO;
import com.pigbank.project.dto.NoticeDTO;

import com.pigbank.project.dto.TransferDTO;
import com.pigbank.project.service.LeeServiceImpl;




@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class LeeController {
	
	private static final Logger logger = LoggerFactory.getLogger(LeeController.class);
	
	@Autowired
	private LeeServiceImpl service;
	
	// 전체계좌조회
	@GetMapping(value="/allAccounts")
	public List<AccountDTO> allAccountList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		List<AccountDTO> list = service.allAccountList(req, model);
		return list;
	}
	// http://localhost:8081/Accounts
	
	// 계좌조회(id)
	@GetMapping(value="/Accounts")
	public List<AccountDTO> accountList(@RequestParam String id)
			throws ServletException, IOException {
		List<AccountDTO> list = service.accountList(id);
		return list;
	}
	
	// 계좌이체 insert
	@PostMapping(value="/Transfer")
	public void insertTransfer(@RequestBody TransferDTO dto)
			throws ServletException, IOException {
		service.InsertTransfer(dto);
	}
	
	// 계좌이체 다른은행 insert
	@PostMapping(value="/OtherTransfer")
	public void insertOtherTransfer(@RequestBody TransferDTO dto)
			throws ServletException, IOException {
		service.InsertOtherTransfer(dto);
	}
	
	// 자동이체 insert
	@PostMapping(value="/autoTransfer")
	public void autoInsertTransfer(@RequestBody AutoTransferDTO dto)
			throws ServletException, IOException {
		service.AutoInsertTransfer(dto);
	}
	
	// 자동이체 조회 목록(계좌번호, 상태)
	@GetMapping(value="/autoCheck")
	public List<AutoTransferDTO> autoTransferCheck(@RequestParam String acNumber, @RequestParam String aState)
			throws ServletException, IOException {
		List<AutoTransferDTO> list = service.AutoTransferCheck(acNumber,aState);
		return list;
	}
	
	// 자동이체내역 목록
	// http://localhost:8081/trsferList
	@GetMapping(value="/trsferList")
	public List<AutoTransferListDTO> transferList(@RequestParam String id)
			throws ServletException, IOException {
		return service.transferList(id);
	}
	
	// 자동이체 목록(아이디)
	@GetMapping(value="/autotransferList")
	public List<AutoTransferDTO> autoTransferList(@RequestParam String id)
			throws ServletException, IOException {
		System.out.println("id : " + id);
		return service.autoTransferList(id);
	}

	// 자동이체 해지
	@PostMapping(value="/cancelauto")
	public void cancelAuto(@RequestBody String aNum)
			throws ServletException, IOException {
	    // String aNum 값이 들어올때 '"3,1"'이들어와서 "" <= 를 제거하는 방법
	    String arum = aNum.replace("\"","");
	    String[] aNumArr = arum.split(",");
	    for (int i = 0; i < aNumArr.length; i++) {
	        int anum = Integer.parseInt(aNumArr[i].trim());
	        service.autoTransferCancel(anum);
	    }
	}
	
	// 자동이체 상세(한개선택)
	@GetMapping(value="/selectOne")
	public AutoTransferDTO selectOne(@RequestParam int anum)
			throws ServletException, IOException {
			return service.selectOne(anum);
	}
	
	// 자동이체 수정
	@PostMapping(value="/updateOne")
	public void updateOne(@RequestBody AutoTransferDTO dto)
			throws ServletException, IOException {
		System.out.println("dto : " + dto);
		service.updatedirectlyAutoTransfer(dto);
	}
	
	// 이체한도 수정
	@PostMapping(value="/updatetrsfLimit")
	public void updateTrsfLimit(@RequestBody AccountDTO dto)
			throws ServletException, IOException {
		System.out.println("dto : " + dto);
		service.updatetrsfLimit(dto);
	}
	
	
	// -- 공지사항
	// http://localhost:8081/noticeList
	@GetMapping(value="/noticeList")
	public List<NoticeDTO> noticeList(HttpServletRequest req, Model model)
			throws ServletException,IOException {
		
		return service.noticeList(req, model);
	}
	
	// 공지사항 상세페이지
	@GetMapping(value="/checkonenotice")
	public NoticeDTO checkonenotice(@RequestParam String nNum)
			throws ServletException,IOException {
		System.out.println(nNum);
		int nnum = Integer.parseInt(nNum);
		
		return service.checkonenotice(nnum);
	}
	
	// 공지사항 수정
	@PostMapping(value="/changenotice")
	public void changenotice(@RequestBody NoticeDTO dto)
			throws ServletException,IOException {
		System.out.println("dto : " + dto);
		service.changenotice(dto);
	}
	
	// 공지사항 삭제
	@PostMapping(value="/deletenotice")
	public void deletenotice(@RequestBody int nNum)
			throws ServletException,IOException {
		System.out.println("nNum : " + nNum);
		
		service.deletenotice(nNum);
	}
	
	// 공지사항 추가
	@PostMapping(value="/addnotice")
	public void addnotice(@RequestBody NoticeDTO dto)
			throws ServletException,IOException {
		System.out.println("noticedtoadd : " + dto);
		service.addnotice(dto);
	}
	
	// 고객 공지사항 상세 페이지
	@GetMapping(value="/csboardDetail")
	public NoticeDTO csboardDetail(@RequestParam String nNum)
			throws ServletException,IOException {
		System.out.println(nNum);
		int nnum = Integer.parseInt(nNum);
		
		return service.csboardDetail(nnum);
	}
	

}
