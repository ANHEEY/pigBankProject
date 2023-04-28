package com.pigbank.project.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pigbank.project.dao.CustomerMapper;
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositProductDTO;

@Service
public class CustomerServiceImpl implements CustomerService{

   @Autowired
   private BCryptPasswordEncoder passwordEncoder;
   
   @Autowired
   private CustomerMapper dao;
   
   @Override
   public void insertCustomerAction(CustomerDTO customerDTO) {
      System.out.println("service - insertCustomer");
      System.out.println("customerDTO : "+customerDTO);
      String encryptPwd = passwordEncoder.encode(customerDTO.getPwd());
      System.out.println("encryptPwd : "+encryptPwd);
      customerDTO.setPwd(encryptPwd);
      
      dao.insertCustomer(customerDTO);
   }

   @Override
   public int loginCustomerAction(Map<String, String> map) {
      System.out.println("service - insertCustomer");
      return 0;
   }

   //관리자 예금 상품 등록
   @Override
   public void depositPdSaveAction(DepositProductDTO depositProductDTO) {
      System.out.println("service - depositPdSave");
      
      System.out.println("depositProductDTO : "+depositProductDTO);
      
      dao.depositPdSave(depositProductDTO);      
   }

   //관리자 예금 상품 리스트
   @Override
   public List<DepositProductDTO> depositProductListAction() {
      System.out.println("service - depositProductListAction");
      
      return dao.depositProductList();
   }

   //관리자 예금 상품상세페이지
   @Override
   public DepositProductDTO depositPdDetail(String dpdName) {
      System.out.println("service - depositPdDetail");
      System.out.println("dao.depositPdDetail(dpdName) : "+dao.depositPdDetail(dpdName));
      
      return dao.depositPdDetail(dpdName);
   }
   
   

}