package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.pigbank.project.dto.CustomerDTO;

public interface HyeService {
	
	//회원 정보 목록
	public List<CustomerDTO> listCustomerAll(HttpServletRequest req, Model model)
		throws ServletException, IOException;
	
	//탈퇴 요청 고객 목록
	public List<CustomerDTO> listCustomerWithdrawal(HttpServletRequest req, Model model)
			throws ServletException, IOException;
	
	//고객 조회(회원 상세 페이지)
	public CustomerDTO detailCustomer(String id)
		throws ServletException, IOException;
	
	//고객 검색(나중에)
	
	
}
