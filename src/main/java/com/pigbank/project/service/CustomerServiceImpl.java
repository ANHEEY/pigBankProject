package com.pigbank.project.service;

import java.nio.CharBuffer;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.pigbank.project.dao.CustomerMapper;
import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AssetManagementDTO;
import com.pigbank.project.dto.CredentialsDTO;
import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.dto.DepositAccountDTO;
import com.pigbank.project.dto.DepositProductDTO;
import com.pigbank.project.dto.SavingAccountDTO;
import com.pigbank.project.exception.AppException;
import com.pigbank.project.util.EmailChkHandler;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService{

   @Autowired
   private PasswordEncoder passwordEncoder;
   
   @Autowired
   private CustomerMapper dao;
   
   @Autowired
   private JavaMailSender javaMailSender;
   
   //회원가입
   @Override
   public String insertCustomerAction(CustomerDTO customerDTO) {
      System.out.println("service - insertCustomer");
      
      System.out.println("customerDTO : "+customerDTO);

      //패스워드 암호화
      String encryptPwd = passwordEncoder.encode(customerDTO.getPwd());
      customerDTO.setPwd(encryptPwd);
      
      System.out.println("encryptPwd : "+encryptPwd);
      
      //이메일인증키 추가
      String key = EmailChkHandler.getKey();
      customerDTO.setKey(key);
      
      dao.insertCustomer(customerDTO);
      
      return key;
   }
   
   //아이디 중복 확인
	@Override
	public int duplicateIdAction(String id) {
		System.out.println("service - duplicateIdAction");
		
		return dao.duplicateId(id);
	}
	
	//가입 성공시 이메일 인증을 위한 이메일 전송
	@Override
	public void sendEmail(String email, String key){
		System.out.println("service - sendEmail");
		
		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
			helper.setTo("ahnhyahnhy@naver.com");
			helper.setFrom("ahnhyahnhy@naver.com");
			helper.setSubject("회원가입 인증 메일");
			helper.setText("회원가입을 축하드립니다. 링크를 눌러 인증을 완료하세요."
			        + "<a href='http://localhost:8081/emailChk?key=" + key + "'>링크</a>", true);
			
			javaMailSender.send(mimeMessage);
		} catch(Exception e) {
			e.printStackTrace();
		}   
		
	}


	//이메일 인증 후 권한(enabled) update
	@Override
	public void emailChkAction(HttpServletRequest req, Model model) {
		 System.out.println("service - emailChkAction");
		 
		 String key = req.getParameter("key");
		 System.out.println("key : "+key);
		 int selectCnt = dao.selectKey(key);
		 
		 if(selectCnt == 1) {
			 dao.updateGrade(key);
		 }
	}
   
   //회원 인증
	@Override
	public CustomerDTO cusById(String id) {
		System.out.println("service - cusById");		
		
		return dao.cusById(id);
	}
	
	//로그인
	@Override
	public CustomerDTO login(CredentialsDTO credentialsDTO) {
		System.out.println("service - login");		
		
		CustomerDTO customerDTO = dao.cusById(credentialsDTO.getId());
		
		if(passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.getPwd()),customerDTO.getPwd())){
			return customerDTO;
		}
		
		throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
	}
   
   //회원 수정, 탈퇴 전 인증
	@Override
	public int cusCertificationAction(CustomerDTO customerDTO) {
		System.out.println("service - cusCertificationAction");
		System.out.println("customerDTO : "+customerDTO);
		//Bcrypt matches 메서드 불러서 비밀번호 체크해야함
		String encryptPwd = dao.passwordChk(customerDTO.getId());
		System.out.println("encryptPwd : "+encryptPwd);
		if(passwordEncoder.matches(customerDTO.getPwd(), encryptPwd)) {
			return 1;
		}else {
			return 0;
		}
	}
   
   //회원 정보 불러오기
	@Override
	public CustomerDTO customerDetailAction(String id) {
		System.out.println("service - customerDetailAction");
		
		return dao.customerDetail(id);
	}

	//회원 정보 업데이트
	@Override
	public void cusUpdateAction(CustomerDTO customerDTO) {
		System.out.println("service - cusUpdateAction");
		
		System.out.println("customerDTO : "+customerDTO);
	    String encryptPwd = passwordEncoder.encode(customerDTO.getPwd());
	    System.out.println("encryptPwd : "+encryptPwd);
	    customerDTO.setPwd(encryptPwd);
		
		dao.cusUpdate(customerDTO);
	}
	
	//회원 탈퇴 신청
	@Override
	public void cusDeleteAction(String id) {
		System.out.println("service - cusDeleteAction");
		
		dao.cusDelete(id);
	}   
	
	//-------------------------------------------------------------------
	
	
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
   public DepositProductDTO depositPdDetailAction(String dpdName) {
      System.out.println("service - depositPdDetail");
      
      return dao.depositPdDetail(dpdName);
   }

   //관리자 예금 상품 수정
	@Override
	public void depositPdUpdateAction(DepositProductDTO depositProductDTO) {
		 System.out.println("service - depositPdUpdateAction");
		 
		 dao.depositPdUpdate(depositProductDTO);
	}

	//관리자 예금 상품 삭제
	@Override
	public void depositPdDeleteAction(String dpdName) {
		System.out.println("service - depositPdDeleteAction");
		
		dao.depositPdDelete(dpdName);
	}

	//---------------------------------------------------------------------------------------
	
	//고객 예금 상품 리스트
	@Override
	public List<DepositProductDTO> pdDepositListAction() {
		System.out.println("service - pdDepositListAction");
		
		return dao.pdDepositList();
	}
	
	//고객 예금 검색 리스트
	@Override
	public List<DepositProductDTO> depositSearchAction(String dpdName) {
		System.out.println("service - depositSearchAction");
		
		return dao.depositSearch(dpdName);
	}
	
	//고객 예금 상품 상세페이지
	@Override
	public DepositProductDTO pdDepositDetailInfoAction(String dpdName) {
		System.out.println("service - pdDepositDetailInfoAction");
		
		return dao.pdDepositDetailInfo(dpdName);
	}
	
	//고객 예금 상품 가입시 계좌 번호 불러오기
	@Override
	public List<AccountDTO> cusAccountListAction(String id) {
		System.out.println("service - cusAccountListAction");
		
		return dao.cusAccountList(id);
	}
	
	//고객 예금 가입 계좌 개설
	@Override
	public void cusDepositOpenAllAction(DepositAccountDTO depositAccountDTO) {
		System.out.println("service - cusDepositOpenAllAction");
		
        Random rand = new Random();
        int n = rand.nextInt(10000000);
        String randNum = String.format("%07d", n);
		String acNumber ="210"+randNum;
		System.out.println("acNumber : "+Integer.parseInt(acNumber));
		
		depositAccountDTO.setAcNumber(Integer.parseInt(acNumber));
		
		LocalDate today = LocalDate.now();//가입 날짜 = 당일		
		int dPeriod = depositAccountDTO.getDperiod();//예금 가입기간 구하기
		LocalDate addedDate = today.plus(dPeriod, ChronoUnit.MONTHS);//가입 날짜에 예금 가입기간 더하기
		depositAccountDTO.setDendDate(java.sql.Date.valueOf(addedDate));//더해진 날짜를 만기 날짜로 설정
				
		dao.cusDepositOpenAll(depositAccountDTO);//전체 계좌 개설
		dao.cusDepositOpen(depositAccountDTO);//예금 계좌 개설
		dao.cusDepositOpenWithdraw(depositAccountDTO);//입출금 통장에서 출금
		dao.normalToDepositTranfer(depositAccountDTO);//입출금 통장에 계좌이체 내역 추가
		dao.depositFromNormalTransfer(depositAccountDTO);//예금계좌에 계좌이체 내역 추가
		
	}

	//--------------------------------------------------------------------
	
	//고객 예금 해지 예상 조회
	@Override
	public DepositAccountDTO cusDepositCxlExpInfoAction(int dNum) {
		System.out.println("service - cusDepositCxlExpInfoAction");

		//예금이 중도 해지인지 만기 해지인지 파악
		DepositAccountDTO depositAccountDTO =  dao.cusDepositCxlExpInfo(dNum);
		
		System.out.println("depositAccountDTO.getDendDate() : "+depositAccountDTO.getDendDate());
		
		LocalDate joinDate = new java.util.Date(depositAccountDTO.getDjoinDate().getTime())
			    .toInstant()
			    .atZone(ZoneId.systemDefault())
			    .toLocalDate();
		
		LocalDate currentDate = LocalDate.now();
		
		// 만기 해지인 경우
		if(depositAccountDTO.getDendDate().before
				(Date.from(currentDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()))) {
			
			System.out.println("depositAccountDTO : "+depositAccountDTO);
			
			return depositAccountDTO;
		}
		else {	// 중도 해지인 경우
			// 중도 해지 금리 받아오기
			double midCxlRate = dao.depositMidCxlRate(dNum);
			System.out.println("midCxlRate : "+midCxlRate);
			System.out.println("depositAccountDTO.getDamount() : "+depositAccountDTO.getDamount());
			System.out.println("ChronoUnit.MONTHS.between(joinDate, currentDate) : "+ChronoUnit.MONTHS.between(joinDate, currentDate));
			double cxlRate = 
					(midCxlRate/100)*depositAccountDTO.getDamount()*
					ChronoUnit.MONTHS.between(joinDate, currentDate)/12;
			System.out.println("cxlRate : "+cxlRate);
			long cxlAmount = depositAccountDTO.getDamount()+(long)cxlRate;	
			depositAccountDTO.setDexpAmount(cxlAmount);
			
			System.out.println("cxlAmount : "+cxlAmount);
			System.out.println("depositAccountDTO : "+depositAccountDTO);

			return depositAccountDTO;
		}
	}

	//고객 예금 해지 신청
	@Override
	public void cusDepositCxlRegAction(DepositAccountDTO depositAccountDTO) {
		System.out.println("service - cusDepositCxlRegAction");

		dao.cusDepositCxlReg(depositAccountDTO);//예금의 전체 계좌 내용 변경 - 'DELETE',acBalance=0 
		dao.cusDepositCxlRegD(depositAccountDTO);//예금 계좌 내용 변경 - damount, dexpamount = 0
		dao.cusDepositCxlPut(depositAccountDTO);//만기시 입금계좌로 해지 금액 입금
		dao.cxlNormalFromDepositTransfer(depositAccountDTO);//입출금 통장에 계좌이체 내역 추가
		dao.cxlDepositToNormalTransfer(depositAccountDTO);//예금계좌에 계좌이체 내역 추가
		
	}
	
	//--------------------------------------------------------------------
	
	//고객 자산 관리 페이지 (예금, 적금, 입출금, 펀드)
	@Override
	public String assetsManagementAction1(String id) {
		System.out.println("service - assetsManagementAction");
		
		List<AssetManagementDTO> list = dao.assetsManagement1(id);

		System.out.println("list: "+list);
		
		StringBuilder resultBuilder = new StringBuilder();
		resultBuilder.append("[");
		for (int i = 0; i < list.size(); i++) {
		    String acType = list.get(i).getAcType();
		    long acBalance = list.get(i).getAcBalance();
		    resultBuilder.append("['").append(acType).append("',").append(acBalance).append("]");
		    if (i < list.size() - 1) {
		        resultBuilder.append(",");
		    }
		}
		resultBuilder.append("]");

		String result = resultBuilder.toString();
	    
		System.out.println("result : "+result);
		
		return result;
	}

	//고객 자산 관리 페이지 - 펀드 부분
	@Override
	public String assetsManagementFundAction(String id) {
		System.out.println("service - assetsManagementAction");

		List<AssetManagementDTO> list = dao.assetsManagementFund(id);
		
		System.out.println("list: "+list);
		
		StringBuilder resultBuilder = new StringBuilder();
		
		resultBuilder.append("[");
		for(int i=0; i<list.size();i++) {
			String fpdName = list.get(i).getFpdName();
			double fHavingTotal = list.get(i).getFHavingTotal();
			resultBuilder.append("['").append(fpdName).append("',").append(fHavingTotal).append("]");
			if(i<list.size()-1) {
				resultBuilder.append(",");
			}
		}
		
		resultBuilder.append("]");
		
		String result = resultBuilder.toString();
		
		System.out.println("result : "+result);
		
		return result;
	}

	//--------------------------------------------------------------------------
	
	//입출금 계좌 상세페이지 정보 불러오기
	@Override
	public AccountDTO acDetailInfoAction(long acNumber) {
		System.out.println("service - acDetailInfoAction");

		return dao.acDetailInfo(acNumber);
	}

	//예금 계좌 상세페이지 정보 불러오기
	@Override
	public DepositAccountDTO deDetailInfoAction(long acNumber) {
		System.out.println("service - deDetailInfoAction");

		return dao.deDetailInfo(acNumber);
	}

	//적금 계좌 상세페이지 정보 불러오기
	@Override
	public SavingAccountDTO saDetailInfoAction(long acNumber) {
		System.out.println("service - saDetailInfoAction");

		return dao.saDetailInfo(acNumber);
	}



}