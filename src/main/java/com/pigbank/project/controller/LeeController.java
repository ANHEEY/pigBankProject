package com.pigbank.project.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AutoTransferDTO;
import com.pigbank.project.dto.NoticeDTO;
import com.pigbank.project.dto.TransferDTO;
import com.pigbank.project.service.LeeServiceImpl;


@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class LeeController {
	
	private static final Logger logger = LoggerFactory.getLogger(LeeController.class);
	
	@Autowired
	private LeeServiceImpl service;
	

	// http://localhost:8081/allAccounts
	@GetMapping(value="/allAccounts")
	public List<AccountDTO> allAccountList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		logger.info("<<< url - accountList >>>");
		
		List<AccountDTO> list = service.allAccountList(req, model);
		
		System.out.println(list);
		return list;
	}
	// http://localhost:8081/Accounts
	
	// 계좌조회
	@GetMapping(value="/Accounts")
	public List<AccountDTO> accountList(@RequestParam String id)
			throws ServletException, IOException {
		logger.info("<<< url - accountList >>>");
		System.out.println("id : " + id);
		List<AccountDTO> list = service.accountList(id);
		
		System.out.println(list);
		return list;
	}
	
	@PostMapping(value="/Transfer")
	public void insertTransfer(@RequestBody TransferDTO dto)
			throws ServletException, IOException {
				logger.info("<<< url - InsertTransfer");
		
				System.out.println("dto : " + dto);
				service.InsertTransfer(dto);
	}
	
	@PostMapping(value="/autoTransfer")
	public void autoInsertTransfer(@RequestBody AutoTransferDTO dto)
			throws ServletException, IOException {
		logger.info("<<< url - InsertTransfer");
		System.out.println("dto : " + dto);
		service.AutoInsertTransfer(dto);
	}
	
	@GetMapping(value="/autoCheck")
	public List<AutoTransferDTO> autoTransferCheck(@RequestParam String acNumber, @RequestParam String aState)
			throws ServletException, IOException {
		logger.info("<<< url - autoTransferCheck");
		
		System.out.println("acNumber : " + acNumber);
		System.out.println("aState : " + aState);
		List<AutoTransferDTO> list = service.AutoTransferCheck(acNumber,aState);
		System.out.println("list : " + list);
		return list;
	}
	
	@PostMapping(value="/cancelauto")
	public void cancelAuto(@RequestBody String aNum)
			throws ServletException, IOException {
	    logger.info("<<< url - cancelAuto");
	    // String aNum 값이 들어올때 '"3,1"'이들어와서 "" <= 를 제거하는 방법
	    String arum = aNum.replace("\"","");
	    String[] aNumArr = arum.split(",");
	    for (int i = 0; i < aNumArr.length; i++) {
	        int anum = Integer.parseInt(aNumArr[i].trim());
	        System.out.println("anum : " + anum);
	        service.autoTransferCancel(anum);
	    }
	}

	
	@GetMapping(value="/selectOne")
	public AutoTransferDTO selectOne(@RequestParam int anum)
			throws ServletException, IOException {
			return service.selectOne(anum);
	}
	
	@PostMapping(value="/updateOne")
	public void updateOne(@RequestBody AutoTransferDTO dto)
			throws ServletException, IOException {
		System.out.println("dto : " + dto);
		service.updatedirectlyAutoTransfer(dto);
	}
	
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
}
