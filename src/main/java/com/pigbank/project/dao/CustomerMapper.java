package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositProductDTO;

@Mapper
public interface CustomerMapper {

   public void insertCustomer(CustomerDTO customerDTO);
   
   public CustomerDTO loginCustomer(String id);
   
   public void depositPdSave(DepositProductDTO depositProductDTO);
   
   public List<DepositProductDTO> depositProductList();
   
   public DepositProductDTO depositPdDetail(String dpdName);

   public void depositPdUpdate(DepositProductDTO depositProductDTO);
   
   public void depositPdDelete(String dpdName);
   
   //-------------------------------------------------------------------
   
   public List<DepositProductDTO> pdDepositList();
   
   public DepositProductDTO pdDepositDetailInfo(String dpdName);
   
}