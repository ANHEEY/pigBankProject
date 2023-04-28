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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;
import com.pigbank.project.service.KimServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class KimController {

	private static final Logger logger = LoggerFactory.getLogger(ChuController.class);
	
	@Autowired
	private KimServiceImpl service;
	
	// [관리자]
	// 적금상품 목록
	@GetMapping(value="/adPdSaving")
	public List<SavingProductDTO> aPdSavingList(HttpServletRequest req, Model model) throws ServletException, IOException {
		logger.info("<< URL - aPdSavingList >>");
		
		return service.listAllSPd(req, model);
	}
	
	// 상품 1건 조회(상세)
	@GetMapping(value="/sListByPdName/{spdname}")
	public SavingProductDTO listByPdName(@PathVariable String spdname) throws ServletException, IOException {
		logger.info("<< URL - listByPdName >>");
		
		return service.selectPdSaving(spdname);
	}
	
	// 적금상품 등록
	@PostMapping(value="/adPdInsert")
	public void aPdSavingInsert(@RequestBody SavingProductDTO sPdDTO) throws ServletException, IOException {
		logger.info("<< URL - aPdSavingInsert >>");
		System.out.println(sPdDTO);
		service.insertSPd(sPdDTO);
		
		System.out.println("PdSavingInsert 성공");   
	}
	
	// 적금상품 수정
	@PutMapping(value="/adPdUpdate")
	public void aPdSavingUpdate(@PathVariable String spdname, @RequestBody SavingProductDTO sPdDTO) throws ServletException, IOException {
		logger.info("<< URL - aPdSavingUpdate >>");
		System.out.println(sPdDTO);
		service.updateSPd(sPdDTO);
		
		System.out.println("PdSavingUpdate 성공");
	}
	
	// 적금상품 삭제
	@PutMapping(value="/adPdDelete")
	public void aPdSavingDelete(@PathVariable String sPdName) throws ServletException, IOException {
		logger.info("<< URL - aPdSavingUpdate >>");
		
		service.deleteSpd(sPdName);	
	}
	
	// [고객]
	// 자유입출금계좌 생성
	@PostMapping(value="/custAInsert")
	public void custAccInsert(@RequestBody AccountDTO aPdDTO) throws ServletException, IOException {
		logger.info("<< URL - custAccInsert >>");
		System.out.println(aPdDTO);
		
		service.insertAPd(aPdDTO);
		System.out.println("custAccInsert 성공");
	}
	
	// 적금계좌 생성(상품신청)
	@PostMapping(value="/custSAInsert")
	public void custSavingInsert(@RequestBody SavingAccountDTO custSPdDTO) throws ServletException, IOException {
		logger.info("<< URL - customer SavingAccount Insert >>");
		System.out.println(custSPdDTO);
		
		service.insertCustSPd(custSPdDTO);
		System.out.println("custSavingInsert 성공");
	}
	
	// 적금 상품 조회
	@GetMapping(value="/custSPdList")
	public List<SavingProductDTO> custSPdList(HttpServletRequest req, Model model) throws ServletException, IOException {
		logger.info("<< URL - custSPdList >>");
		
		return service.listAllSPd(req, model);
	}
	// 적금 1건 상세조회
	//@GetMapping(value="")
	
}
