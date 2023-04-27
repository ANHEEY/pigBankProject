package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.pigbank.project.dto.LoanProductDTO;

public interface SooService {
	
	// 대출상품 리스트
	public List<LoanProductDTO> pdLoanList(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	// 대출상품 추가
	public void pdLoandInsert(LoanProductDTO loanProdctDTO)
			throws ServletException,IOException;
	
	// 대출 상품 상세화면 
	public LoanProductDTO selectProduct(String lpdName)
			throws ServletException,IOException;
	
	// 대출 상품 수정
	public void editProduct(LoanProductDTO loanProdctDTO)
			throws ServletException,IOException;
	
}
