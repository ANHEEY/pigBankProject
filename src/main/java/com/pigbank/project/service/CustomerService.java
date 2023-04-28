package com.pigbank.project.service;

import java.util.List;
import java.util.Map;

import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositProductDTO;

public interface CustomerService {

   public void insertCustomerAction(CustomerDTO customerDTO);
   
   public int loginCustomerAction(Map<String,String> map);
   
   public void depositPdSaveAction(DepositProductDTO depositProductDTO);
   
   public List<DepositProductDTO> depositProductListAction();

   public DepositProductDTO depositPdDetail(String dpdName);

   
}