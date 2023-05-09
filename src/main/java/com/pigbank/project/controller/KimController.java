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
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.dto.SavingProductDTO;
import com.pigbank.project.service.KimServiceImpl;

import lombok.Data;

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
	
	// 적금상품 수정 @PutMapping(value="/adPdUpdate/{spdname}")
	@PostMapping(value="/adPdUpdate/{spdname}")
	public void aPdSavingUpdate(@PathVariable String spdname, @RequestBody SavingProductDTO sPdDTO) throws ServletException, IOException {
		logger.info("<< URL - aPdSavingUpdate >>");
		System.out.println(sPdDTO);
		
		service.updateSPd(sPdDTO);
		System.out.println("PdSavingUpdate 성공");
	}
	
	// 적금상품 삭제
	// , @RequestBody SavingProductDTO sPdDTO
	@PostMapping(value="/adPdDelete/{spdname}")
	public void aPdSavingDelete(@PathVariable String spdname) throws ServletException, IOException {
		logger.info("<< URL - aPdSavingUpdate >>");
		System.out.println("spdname: " + spdname);
		
		service.deleteSpd(spdname);
		System.out.println("aPdSavingDelete 성공");
	}
	
	// [고객] ------------------------------------------------------------------------------------------------------------------------------------
	// 자유입출금계좌 개설
	@PostMapping(value="/custAInsert")
	public void custAccInsert(@RequestBody AccountDTO aPdDTO) throws ServletException, IOException {
		logger.info("<< URL - custAccInsert >>");
		System.out.println(aPdDTO);
		
		service.insertAPd(aPdDTO);
		System.out.println("자유입출금 개설완료!");
	}
	
	// -----------------------------------------------------------------------------------------------------------------------------------------
	
	// 적금 상품 조회 (관리자 서비스, DAO)
	@GetMapping(value="/custSPdList")
	public List<SavingProductDTO> custSPdList(HttpServletRequest req, Model model) throws ServletException, IOException {
		logger.info("<< URL - custSPdList >>");
		
		return service.listAllSPd(req, model);
	}
	
	// 적금 상품 검색
	@GetMapping(value="/savingSearch/{spdname}")
	public List<SavingProductDTO> savingProductSearch(@PathVariable String spdname) throws ServletException, IOException {
		logger.info("<< URL - (customer) Search >>");
		
		return service.savingSearchAction(spdname);
	}
	
	// 적금 1건 상세조회 (관리자 서비스, DAO)
	@GetMapping(value="/custProduct/{spdname}")
	public  SavingProductDTO pdByList(@PathVariable String spdname) throws ServletException, IOException {
		logger.info("<< URL - (customer)pdByList >>");
		
		return service.selectPdSaving(spdname);
	}
	
	// 적금계좌 개설(상품 가입페이지)
	@PostMapping(value="/custSInsert/{spdname}")
	public void custSavingInsert(@PathVariable String spdname, @RequestBody SavingAccountDTO savingDTO) throws ServletException, IOException {
		logger.info("<< URL - customer SavingAccount Insert >>");
		System.out.println("savingDTO" + savingDTO);
		service.insertCustAcc(savingDTO);
		
		System.out.println("적금계좌 개설완료!");
	}
	
	// -----------------------------------------------------------------------------------------------------------------------------------------
	
	// 적금중도해지 조회(적금 1건에 대한 Detail)
	
	
	// 적금금중도해지 페이지(중도해지 신청)
	
	
}
