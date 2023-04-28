package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.pigbank.project.dao.SooMapper;
import com.pigbank.project.dto.LoanProductDTO;

@Service
public class SooServiceImpl implements SooService{

	@Autowired
	private SooMapper dao;
	
	// 대출 상품 리스트
	@Override
	public List<LoanProductDTO> pdLoanList(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		
		List<LoanProductDTO> list = dao.showPdLoantList();
		
		return list;
	}
	
	// 대출상품 추가
	@Override
	public void pdLoandInsert(LoanProductDTO loanProductDTO) 
			throws ServletException, IOException {
		System.out.println("service - pdLoanInsert");
	
		dao.insertPdLoan(loanProductDTO);
		
	}
	
	// 대출상품 1건 조회
	@Override
	public LoanProductDTO selectProduct(String lpdName) throws ServletException, IOException {
		System.out.println("service - selectProduct");
	
		return dao.selectProduct(lpdName);
	}

	// 대출상품 수정
	@Override
	public void editProduct(LoanProductDTO loanProdctDTO) throws ServletException, IOException {
		System.out.println("service - editProduct");
		
		dao.updateProduct(loanProdctDTO);
	}

	// 대출상품 삭제
	@Override
	public void deleteProduct(String lpdName) throws ServletException, IOException {
		System.out.println("service - deleteProduct");
		
		dao.deleteProduct(lpdName);
	}

}
