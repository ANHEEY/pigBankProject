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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pigbank.project.dto.LoanProductDTO;
import com.pigbank.project.service.SooServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
@RequestMapping(value="/loan")
public class SooController {

	private static final Logger logger = LoggerFactory.getLogger(SooController.class);


	@Autowired
	private SooServiceImpl service;
	
	// 대출 상품 리스트
	@GetMapping(value="/admin/list")
	public List<LoanProductDTO> loanProductList(HttpServletRequest req, Model model)
		throws ServletException, IOException {
			logger.info("<<< url - loanProductList >>>");
			
			List<LoanProductDTO> list = service.pdLoanList(req, model);
			
			return list;
	}
	
	// 대출 상품 추가
	@PostMapping(value="/admin/add")
	public void addPdLoan(@RequestBody LoanProductDTO loanProductDTO)
			throws ServletException, IOException {
		logger.info("<<< url - pdLoanAdd >>>");
		
		service.pdLoandInsert(loanProductDTO);
		
		System.out.println("pdLoanAdd");
	}

		
	// 1건 select
	@GetMapping("/admin/{lpdName}")
	public LoanProductDTO fetchProductByName(@PathVariable String lpdName)		
		throws ServletException, IOException {
		logger.info("<<< url - fetchProductByName >>>");
		
		return service.selectProduct(lpdName);
	}
		
	
	// update
	@PutMapping("/admin/edit/{lpdName}")
	public void editPdLoan(@RequestBody LoanProductDTO dto)		
		throws ServletException, IOException {
		logger.info("<<< url - editPdLoan >>>");
		
		service.editProduct(dto);
		System.out.println("[ edit 성공~~ ]");
	}
	
//	// delete
//	@DeleteMapping("/{id}")
//	public void memberDelete(@PathVariable int id)
//		throws ServletException, IOException {
//		logger.info("<<< url - memberDelete() >>>");
//		
//		service.deleteMember(id);;
//		System.out.println("[ Delete 성공~~ ]");
//	}
}
