package com.pigbank.project.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.config.UserAuthProvider;
import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AssetManagementDTO;
import com.pigbank.project.dto.CredentialsDTO;
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;
import com.pigbank.project.service.CustomerServiceImpl;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class HeeController {

   private static final Logger logger = LoggerFactory.getLogger(HeeController.class);
   
   @Autowired
   private CustomerServiceImpl service;
   
   private final UserAuthProvider userAuthProvider;
   
   //고객 회원가입
   @PostMapping(value="/customerJoin")
   public void customerJoin (@RequestBody CustomerDTO customerDTO)
         throws ServletException,IOException{
      logger.info("url - customerJoin");
      System.out.println("customerDTO : "+customerDTO);
      service.insertCustomerAction(customerDTO);
      System.out.println("customerJoin 성공");
   }
   
   //로그인
   @PostMapping(value="/login")
   public ResponseEntity<CustomerDTO> login(@RequestBody CredentialsDTO credentialsDTO) 
         throws ServletException,IOException {
      logger.info("url - login");

      CustomerDTO customerDTO = service.login(credentialsDTO);
      String token = userAuthProvider.createToken(customerDTO.getId());
      System.out.println("token : "+token);
      customerDTO.setToken(token);
      
      System.out.println("login성공");
      
      HttpHeaders headers = new HttpHeaders();
      headers.add("Authorization",token);

      //return ResponseEntity.ok(customerDTO);
      return new ResponseEntity<>(customerDTO, headers, HttpStatus.OK);
   }
   
   //아이디 중복 체크
   @GetMapping(value="/duplicateId/{id}")
   public int duplicateId(@PathVariable String id) 
		   throws ServletException, IOException {
	   logger.info("url - duplicateId");
	   
	   return service.duplicateIdAction(id);
   }
   
   //고객 회원수정 및 탈퇴를 위한 본인 인증
   @PostMapping(value="/certification")
   public int cusCertification(@RequestBody CustomerDTO customerDTO) throws ServletException, IOException {
	   logger.info("url - cusCertification");
	   
	   return service.cusCertificationAction(customerDTO);
   }
   
   //고객 정보 불러오기
   @GetMapping(value="/cusDetail/{id}")
   public CustomerDTO customerDetail(@PathVariable String id) throws ServletException, IOException {
	   logger.info("url - customerDetail");
	   
	   return service.customerDetailAction(id);
   }
   
   //고객 정보 업데이트
   @PutMapping(value="/cusUpdate/{id}")
   public void cusUpdate(@PathVariable String id, @RequestBody CustomerDTO customerDTO) 
   		throws ServletException, IOException {
	   logger.info("url - cusUpdate");
	   
	   service.cusUpdateAction(customerDTO);
   }
   
   //고객 탈퇴 신청
   @PutMapping(value="/cusDelete/{id}")
   public void cusDelete(@PathVariable String id) throws ServletException, IOException {
	   logger.info("url - cusDelete");
	   
	   service.cusDeleteAction(id);
   }
   
   //-------------------------------------------------------------------------------
   
   //관리자 예금상품등록
   @PostMapping(value="/depositPdSave")
   public void depositPdSave(@RequestBody DepositProductDTO depositProductDTO) 
		   throws ServletException, IOException {
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
   public List<DepositProductDTO> depositProductList() 
		   throws ServletException, IOException {
      logger.info("url - depositProductList");

      return service.depositProductListAction();      
   }

   //관리자 예금 상세페이지  depositPdDetail
   @GetMapping(value="/depositPdDetail/{dpdName}")
   public DepositProductDTO depositPdDetail(@PathVariable String dpdName) 
		   throws ServletException, IOException {
      logger.info("url - depositPdDetail");
      System.out.println("dpdName : "+dpdName);
      
      return service.depositPdDetailAction(dpdName);      
   }
   
   //관리자 예금 수정 depositPdUpdate
   @PutMapping(value="/depositPdUpdate/{dpdName}")
   public void depositPdUpdate(@PathVariable String dpdName, @RequestBody DepositProductDTO depositProductDTO) 
		   throws ServletException, IOException {
	   logger.info("url - depositPdUpdate");
	   
	   System.out.println("dpdName : "+dpdName);
	   System.out.println("depositProductDTO : "+depositProductDTO);
	   service.depositPdUpdateAction(depositProductDTO);
   }
   
   //관리자 예금 삭제 depositPdDelete
   @PutMapping(value="/depositPdDelete/{dpdName}")
   public void depositPdDelete(@PathVariable String dpdName) 
		   throws ServletException, IOException {
	   logger.info("url - depositPdDelete");
	   
	   System.out.println("dpdName : "+dpdName);
	   
	   service.depositPdDeleteAction(dpdName);	   
   }
   
   //------------------------------------------------------------
   
   //고객 예금 상품 리스트
   @GetMapping(value="/pdDepositList")
   public List<DepositProductDTO> pdDepositList()
   		throws ServletException, IOException {
	   logger.info("url - pdDepositList");
	   
	   return service.pdDepositListAction();
   }
   
   //고객 예금 검색 리스트
   @GetMapping(value="/depositSearch/{dpdName}")
   public List<DepositProductDTO> depositSearch(@PathVariable String dpdName)
	   	throws ServletException, IOException {
	   logger.info("url - depositSearch");
		   
	   return service.depositSearchAction(dpdName);
   }
   
   //고객 예금 상품 상세페이지
   @GetMapping(value="/pdDepositDetailInfo/{dpdName}")
   public DepositProductDTO pdDepositDetailInfo(@PathVariable String dpdName)
   		throws ServletException, IOException{
	   logger.info("url - pdDepositDetailInfo");
	   
	   System.out.println("dpdName : "+dpdName);
	   
	   return service.pdDepositDetailInfoAction(dpdName);
   }
   
   //고객 예금 가입시 계좌번호 불러오기
   @GetMapping(value="/cusAccountList/{id}")
   public List<AccountDTO> cusAccountList(@PathVariable String id)
   		throws ServletException, IOException {
	   logger.info("url - cusAccountList");
	   
	   return service.cusAccountListAction(id);
   }
   
   //고객 예금 가입
   @PostMapping(value="/cusDepositOpen")
   public void cusDepositOpen(@RequestBody DepositAccountDTO depositAccountDTO)
   		throws ServletException, IOException {
	   logger.info("url - cusDepositOpen");
	   
	   System.out.println("depositAccountDTO : "+depositAccountDTO);
	   
	   service.cusDepositOpenAllAction(depositAccountDTO);

   }
   
   //--------------------------------------------------------------------
   
   //자산관리 페이지
   @GetMapping(value="/assetsManagement/{id}")
   public String assetsManagement(@PathVariable String id)
		   throws ServletException, IOException {
	   logger.info("url - assetsManagement1");
	   
	   return service.assetsManagementAction1(id);
   }
   
//   @GetMapping(value="/assetsManagement/{id}")
//   public List<AssetManagementDTO> assetsManagement(@PathVariable String id)
//		   throws ServletException, IOException {
//	   logger.info("url - assetsManagement1");
//	   
//	   return service.assetsManagementAction1(id);
//   }
   
   
}