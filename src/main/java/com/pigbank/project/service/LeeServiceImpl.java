package com.pigbank.project.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.TemporalAccessor;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.pigbank.project.dao.LeeMapper;
import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.AutoTransferDTO;
import com.pigbank.project.dto.TransferDTO;

@EnableScheduling
@Service
public class LeeServiceImpl implements LeeService{
	
	private LocalDate startDate = LocalDate.parse("2023-05-01");
	
	@Autowired
	private LeeMapper dao;
	
	@Override
	public List<AccountDTO> accountList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		String id = "hong1234";
		System.out.println("dao : " + dao.accountList(id));
		return dao.accountList(id);
	}

	@Override
	public void InsertTransfer(TransferDTO tdto) 
			throws ServletException, IOException {
//		출금
		String tType = "출금";
		tdto.setTType(tType);
		// acNumber : 11022456542
		// tdeposit : 21024565488
		System.out.println("service tdto : " + tdto);
		dao.insertTransfer(tdto);
	
		dao.updateAccount(tdto);
		
//		입금
		String tType2 = "입금";
		tdto.setTType(tType2);
		
		// acNumber : 21024565488
		// tdeposit : 11022456542
		
		// 값 저장
		long tmp = tdto.getAcNumber();
		String tmp2 = tdto.getMyMemo();
		tdto.setMyMemo(tdto.getYourMemo());
		tdto.setYourMemo(tmp2);
		tdto.setAcNumber(tdto.getTDepositnum());
		tdto.setTDepositnum(tmp);
		
		dao.insertTransfer(tdto);
		dao.updateAccountnext(tdto);
	}

	@Override
	public void AutoInsertTransfer(AutoTransferDTO atdto) 
			throws ServletException, IOException {
		
		dao.autoInsertTransfer(atdto);
		// acNumber : 11022456542
		// aDepositnum : 21024565488
	}

	@Override
	@Scheduled(cron = "0 0/1 * 1/1 * ?")
	public void checkScheduled() 
			throws ServletException, IOException {
		LocalDate currentDate = LocalDate.now();
		int day = currentDate.getDayOfMonth();
		int month = currentDate.getMonthValue();
		int year = currentDate.getYear();
		
		// atdto == 자동이체 내역 List로 가져오기
		List<AutoTransferDTO> atdtolist = dao.autoTransferList();
		System.out.println("atdto = " + atdtolist);
		for(int i = 0; i < atdtolist.size(); i++) {
			
			// AutoTransferDTO 자동이체 내역 dto 
			int aNum = atdtolist.get(i).getANum();
			long acNumber = atdtolist.get(i).getAcNumber();
			long aDepositnum = atdtolist.get(i).getADepositnum();
			String aDepositBank = atdtolist.get(i).getADepositBank();
			int aDepositAmount = atdtolist.get(i).getADepositAmount();
			String myMemo = atdtolist.get(i).getMyMemo();
			String yourMemo = atdtolist.get(i).getYourMemo();
			String aState = atdtolist.get(i).getAState();
			// 시작날짜 연
			int ayear = atdtolist.get(i).getAStartDate().getYear() + 1900;
			// 시작날짜 월
			int amonth = atdtolist.get(i).getAStartDate().getMonth() + 1;
			// 시작날짜 일
			int adate = atdtolist.get(i).getAStartDate().getDate();
			Date aenddeposit = atdtolist.get(i).getAEndDate();
			// 끝나는 날짜 연
			int aendyear = atdtolist.get(i).getAEndDate().getYear() + 1900;
			// 끝나는 날짜 월
			int aendmonth = atdtolist.get(i).getAEndDate().getMonth() + 1;
			// 끝나는날짜 일
			int aenddate = atdtolist.get(i).getAEndDate().getDate();
			int cycle = atdtolist.get(i).getATransferCycle();
			int update = atdtolist.get(i).getAUpdate();
			// 끝나는 날짜
			String enddate = (aendyear + "-" + aendmonth + "-" + aenddate);
			// 오늘 날짜
			String sysdate = (year + "-" + month + "-" + day);
			System.out.println("sysdate : " + sysdate);
			System.out.println("enddate : " + enddate);
			System.out.println("amonth : " + amonth);
			System.out.println("adate : " + adate);
			System.out.println("ayear : " + ayear	);
			System.out.println("aendmonth : " + aendmonth);
			System.out.println("update : " + update);
			if(adate == day) {
				if(amonth + update == month) {
					if(ayear == year) {						
						if(aState != "unusing") {
							if(enddate == sysdate) {
								System.out.println("2");
								HashMap<String,Object> map = new HashMap<String,Object>();
								String unusing = "unusing";
								map.put("aState", unusing);
								map.put("aNum", atdtolist.get(i).getANum());
							
							dao.updateAutoTransfer(map);
						}
						else {
//								출금		
							TransferDTO tdto = new TransferDTO();
							tdto.setAcNumber(acNumber);
							tdto.setTDepositnum(aDepositnum);
							tdto.setTDepositBank(aDepositBank);
							tdto.setTType("출금");
							tdto.setTAmount(aDepositAmount);
							tdto.setMyMemo(myMemo);
							tdto.setYourMemo(yourMemo);
							
							dao.insertTransfer(tdto);
							
							dao.updateAccount(tdto);
		//					입금
							String tType2 = "입금";
							tdto.setTType(tType2);
							
							// acNumber : 21024565488
							// tdeposit : 11022456542
							
							// 값 저장
							long tmp = tdto.getAcNumber();
							String tmp2 = tdto.getMyMemo();
							tdto.setMyMemo(tdto.getYourMemo());
							tdto.setYourMemo(tmp2);
							tdto.setAcNumber(tdto.getTDepositnum());
							tdto.setTDepositnum(tmp);
							
							dao.insertTransfer(tdto);
							dao.updateAccountnext(tdto);
							
							HashMap<String,Object> atmap = new HashMap<String,Object>();
							atmap.put("aNum",atdtolist.get(i).getANum());
							atmap.put("aUpdate",atdtolist.get(i).getAUpdate());
							atmap.put("aTransferCycle",atdtolist.get(i).getATransferCycle());
							System.out.println("성공!");
							dao.updateAutoTransferCycle(atmap);
						}
						}
						else {
							System.out.println("오늘이아님1");
						}
					}
					else {
						System.out.println("오늘이 아님 2");
					}
				}
				else {
					System.out.println("오늘이 아님 2");
				}
			}
			else {
				System.out.println("오늘이아님2");
			}
		}
	}

}
