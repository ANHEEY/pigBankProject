package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.pigbank.project.dao.HyeMapper;
import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.CustomerDTO;

@Service
public class HyeServiceImpl implements HyeService{
	
	@Autowired
	private HyeMapper dao;
	
	/*****************			회원 정보 목록			***************/
	public List<CustomerDTO> listCustomerAll(HttpServletRequest req, Model model)
		throws ServletException, IOException{
		System.out.println("========== 서비스 | listCustomerAll | ==========");
		
		List<CustomerDTO> list = dao.listCustomer();
		return list;
	}
	
	/*****************		고객 조회(회원 상세 페이지)		***************/
	@Override
	public CustomerDTO detailCustomer(String id) 
			throws ServletException, IOException {
		System.out.println("========== 서비스 | detailCustomer | ==========");
		
		CustomerDTO dto = dao.detailCustomer(id);
		return dto;
	}
	@Override
	public List<AccountDTO> detailAccountById(String id)
			throws ServletException, IOException {
		System.out.println("========== 서비스 | detailAccountById | ==========");
		
		List<AccountDTO> list = dao.detailAccountListById(id);
		return list;
	};
	
	/*****************		탈퇴 요청 고객 목록		***************/
	@Override
	public List<CustomerDTO> listCustomerWithdrawal(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		System.out.println("========== 서비스 | listCustomerWithdrawal | ==========");
		
		List<CustomerDTO> list = dao.listWithdrawalCustomer();
		return list;
	}



}
