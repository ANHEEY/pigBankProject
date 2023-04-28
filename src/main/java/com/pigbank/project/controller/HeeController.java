package com.pigbank.project.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositProductDTO;
import com.pigbank.project.service.CustomerServiceImpl;

@CrossOrigin(origins="**", maxAge=3600)//, exposedHeaders = "Authorization"
@RestController
//@RequestMapping(value="/api/p1")
public class HeeController {

   private static final Logger logger = LoggerFactory.getLogger(HeeController.class);
   
   @Autowired
   private CustomerServiceImpl service;
   
   //@Autowired
   //private JwtAuthenticationFilter jwtAuthenticationFilter;
   
   //회원가입
   @PostMapping(value="/customerJoin")
   public void customerJoin (@RequestBody CustomerDTO customerDTO)
         throws ServletException,IOException{
      logger.info("url - customerJoin");
      System.out.println("customerDTO : "+customerDTO);
      service.insertCustomerAction(customerDTO);
      System.out.println("customerJoin 성공");
   }
   
   //로그인
//   @PostMapping(value="/login")
//   public void login(@RequestBody CustomerDTO customerDTO, Model model) 
//         throws ServletException,IOException {
//      logger.info("url - login");
//      System.out.println("customerDTO : "+customerDTO);
//      String id = customerDTO.getId();
//      String pwd = customerDTO.getPwd();
//      
//      model.addAttribute("id", id);
//      model.addAttribute("pwd", pwd);
//      //jwtAuthenticationFilter.attemptAuthentication(request, response);
//      System.out.println("login성공");
//      //return "redirect:/loginProc";
//   }
   
   @RequestMapping(value="/admin/login")
   public String adminLogin() throws ServletException, IOException{
      logger.info("url - adminLogin");
      
      return "/admin/*";
   }
   
   @RequestMapping(value="/customer/login")
   public String customerLogin() throws ServletException, IOException{
      logger.info("url - customerLogin");
      
      return "/customer/*";
   }

   //예금상품등록
   @PostMapping(value="/depositPdSave")
   public void depositPdSave(@RequestBody DepositProductDTO depositProductDTO) {
      logger.info("url - depositPdSave");
      
      System.out.println("DepositProductDTO : "+depositProductDTO.getDcontent());
      System.out.println("DepositProductDTO : "+depositProductDTO.getDcxlRate());
      System.out.println("DepositProductDTO : "+depositProductDTO.getDmax());
      System.out.println("DepositProductDTO : "+depositProductDTO.getDmin());
      System.out.println("DepositProductDTO : "+depositProductDTO.getDpdName());
      System.out.println("DepositProductDTO : "+depositProductDTO.getDperiod());
      System.out.println("DepositProductDTO : "+depositProductDTO.getDrate());
      
      service.depositPdSaveAction(depositProductDTO);      
   }
   
   //관리자 예금상품리스트
   @GetMapping(value="/depositProductList")
   public List<DepositProductDTO> depositProductList() {
      logger.info("url - depositProductList");

      return service.depositProductListAction();      
   }

   //관리자 예금 상세페이지  depositPdDetail
   @GetMapping(value="/depositPdDetail/{dpdName}")
   public DepositProductDTO depositPdDetail(@PathVariable String dpdName) {
      logger.info("url - depositPdDetail");
      System.out.println("dpdName : "+dpdName);
      System.out.println("service.depositPdDetail(dpdName) : "+service.depositPdDetail(dpdName));
      return service.depositPdDetail(dpdName);      
   }
   
}