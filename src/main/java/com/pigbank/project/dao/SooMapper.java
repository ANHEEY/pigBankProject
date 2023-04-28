package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.LoanProductDTO;

@Mapper
public interface SooMapper {
	
	// 대출 상품 리스트
	public List<LoanProductDTO> showPdLoantList();
	
	// 대출상품 추가
	public void insertPdLoan(LoanProductDTO loanProdctDTO);
	
	// 대출상품 조회(상세)
	public LoanProductDTO selectProduct(String lpdName);
	
	// 대출상품 수정
	public void updateProduct(LoanProductDTO loanProdctDTO);
	
	// 대출상품 삭제
	public void deleteProduct(String lpdName);
}
