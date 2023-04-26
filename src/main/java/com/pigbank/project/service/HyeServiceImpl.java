package com.pigbank.project.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.pigbank.project.dao.HyeMapper;
import com.pigbank.project.dto.CustomerDTO;

@Service
public class HyeServiceImpl implements HyeService{
	
	@Autowired
	private HyeMapper dao;
	
	//회원 정보 목록
	public List<CustomerDTO> listCustomerAll(HttpServletRequest req, Model model)
		throws ServletException, IOException{
		System.out.println("========== 서비스 ==========");
		List<CustomerDTO> list = dao.listCustomer();
		return list;
	}

	@Override
	public List<CustomerDTO> listCustomerWithdrawal(HttpServletRequest req, Model model)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CustomerDTO detailCustomer(String id) throws ServletException, IOException {
		// TODO Auto-generated method stub
		return null;
	}


}
