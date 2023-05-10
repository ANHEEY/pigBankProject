package com.pigbank.project.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.TemporalAccessor;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.pigbank.project.dto.AutoTransferListDTO;
import com.pigbank.project.dto.NoticeDTO;
import com.pigbank.project.dto.TransferDTO;

@EnableScheduling
@Service
public class LeeServiceImpl implements LeeService{
	
	@Autowired
	private LeeMapper dao;
	
	// 전체계좌 조회 (비교를 위한)
	@Override
	public List<AccountDTO> allAccountList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		return dao.allAccountList();
	}
	
	// 계좌목록 조회
	@Override
	public List<AccountDTO> accountList(String id) 
			throws ServletException, IOException {
		return dao.accountList(id);
	}

	// 단일건 계좌이체
	@Override
	public void InsertTransfer(TransferDTO tdto) 
			throws ServletException, IOException {
//		출금
		String tType = "출금";
		tdto.setTType(tType);
		// acNumber : 11022456542
		// tdeposit : 21024565488
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

	// 자동이체 등록
	@Override
	public void AutoInsertTransfer(AutoTransferDTO atdto) 
			throws ServletException, IOException {
		
		dao.autoInsertTransfer(atdto);
		// acNumber : 11022456542
		// aDepositnum : 21024565488
	}

	// 스케쥴러로 시간마다 체크후 자동이체 및 자동이체 상태 변경
	@Override
	@Scheduled(cron = "0 0/1 * 1/1 * ?")
	public void checkScheduled() 
			throws ServletException, IOException {
		
		// 오늘날짜
		LocalDate currentDate = LocalDate.now();
		int day = currentDate.getDayOfMonth();
		int month = currentDate.getMonthValue();
		int year = currentDate.getYear();
		
		// atdto == 자동이체 내역 List로 가져오기
		List<AutoTransferDTO> atdtolist = dao.autoTransferList();
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
			// 자동이체 시작날짜 연
			int ayear = atdtolist.get(i).getAStartDate().getYear() + 1900;
			// 자동이체 시작날짜 월
			int amonth = atdtolist.get(i).getAStartDate().getMonth() + 1;
			// 자동이체 시작날짜 일
			int adate = atdtolist.get(i).getAStartDate().getDate();
			Date aenddeposit = atdtolist.get(i).getAEndDate();
			// 자동이체 끝나는 날짜 연
			int aendyear = atdtolist.get(i).getAEndDate().getYear() + 1900;
			// 자동이체 끝나는 날짜 월
			int aendmonth = atdtolist.get(i).getAEndDate().getMonth() + 1;
			// 자동이체 끝나는날짜 일
			int aenddate = atdtolist.get(i).getAEndDate().getDate();
			// 자동이체 이체주기
			int cycle = atdtolist.get(i).getATransferCycle();
			// update 이체주기값 + update => 자동이체 실행시 update 값에 이체주기값이 더해져서 누적됨
			int update = atdtolist.get(i).getAUpdate();
			// trsfacNumber 자동이체의 출금계좌번호
			long trsfacNumber = atdtolist.get(i).getAcNumber();
			// 날짜 + 이체주기값
			int addamont = amonth + update;
			if(adate == day) { // 자동이체 시작날짜 일 == 오늘날짜 일
				// 자동이체시 update라는 변수로 이체주기값을 더해서 자동입출금이 안되게 막음
				if(addamont == month) { // 자동이체 시작날짜 월 == 오늘날짜 월
					if(ayear == year) {	// 자동이체 시작날짜 연 == 오늘날짜 연					
						if(!aState.equals("unusing")) { // 자동이체 상태 가 unusing이 아닐때
							System.out.println("trsfacNumber : " + trsfacNumber);
							// AccountDTO에 계좌 셀렉(자동이체 출금계좌번호로 조회) 단건을 담는다.
							AccountDTO acdto = dao.selectoneaccount(trsfacNumber);
							// 변수 balance(통잔 잔고)에 담고 aDepositAmount(자동이체 금액) 과 비교
							long balance = acdto.getAcBalance();
							System.out.println("balance : " + balance);
								if (aDepositAmount <= balance) { // 자동이체금액이 잔고보다 작거나 같으면 입/출금 실행
								    // 출금		
								    TransferDTO tdto = new TransferDTO();
								    tdto.setAcNumber(acNumber);
								    tdto.setTDepositnum(aDepositnum);
								    tdto.setTDepositBank(aDepositBank);
								    tdto.setTType("출금");
								    tdto.setTAmount(aDepositAmount);
								    tdto.setMyMemo(myMemo);
								    tdto.setYourMemo(yourMemo);

								    dao.insertTransfer(tdto);
								    int result =dao.updateAccount(tdto);
								    if (result == 1) {
								    // 입금
								    TransferDTO tdto2 = new TransferDTO();
								    tdto2.setAcNumber(aDepositnum);
								    tdto2.setTDepositnum(acNumber);
								    tdto2.setTDepositBank(aDepositBank);
								    tdto2.setTType("입금");
								    tdto2.setTAmount(aDepositAmount);
								    tdto2.setMyMemo(yourMemo);
								    tdto2.setYourMemo(myMemo);

								    dao.insertTransfer(tdto2);
								    dao.updateAccountnext(tdto2);
								    	
								    HashMap<String, Object> atmap = new HashMap<String, Object>();
								    atmap.put("aNum", atdtolist.get(i).getANum());
								    atmap.put("aUpdate", atdtolist.get(i).getAUpdate());
								    atmap.put("aTransferCycle", atdtolist.get(i).getATransferCycle());

								    System.out.println("anum : " + atdtolist.get(i).getANum());
								    // update = 이체주기값 + update => 
								    // 자동이체 실행시 update 값에 이체주기값이 더해져서 누적됨
								    // 만약 이체주기를 두달로 설정해놨을시 update 의 default 값은 0이지만
								    // 한번 실행되고나면 cycle(이체주기)값이 2고 update(0) = cycle(2) + update(0)
								    // 이런식으로 업데이트 후 시작날짜 + update 값으로 자동이체 실행 or 실행 x
								    dao.updateAutoTransferCycle(atmap);

								    AutoTransferListDTO atl = new AutoTransferListDTO();
								    atl.setANum(aNum);
								    atl.setAtResult("성공");
								    // 자동이체내역 테이블에 성공로 insert
								    dao.insertAutoTransferList(atl);
								    System.out.println("afterbalance : " + balance);
								    }
								} else { // 자동이체금액이 잔고보다 크면 자동이체 상태 "unusing" 바뀌고 
								    System.out.println("잔액부족합니다 자동이체 취소됩니다.");

								    AutoTransferListDTO atl = new AutoTransferListDTO();
								    atl.setANum(aNum);
								    atl.setAtResult("실패");
								    // 자동이체내역 테이블에 실패로 insert
								    dao.insertAutoTransferList(atl);
								    // 취소될시 상태 변경
								    String unusing = "unusing";
								    HashMap<String, Object> map = new HashMap<String, Object>();
								    map.put("aState", unusing);
								    map.put("aNum", atdtolist.get(i).getANum());
								    // 자동이체 상태 업데이트 (unusing)
								    dao.updateAutoTransfer(map);
			                    }
							} 
						}
					}
				}
		// 종료기간에 의한 상태변경
			if(aendyear == year) {
				if(aendmonth == month) {
					if(aenddate == day) {
						if(!aState.equals("unusing")) {
						System.out.println("unusing");
						HashMap<String,Object> map = new HashMap<String,Object>();
						String unusing = "unusing";
						map.put("aState", unusing);
						map.put("aNum", atdtolist.get(i).getANum());
						// 끝나는 날짜와 오늘 날짜를 비교해 자동이체 상태를 자동으로 해지함 (unusing)
						dao.updateAutoTransfer(map);
						}
					}
				}
			}
		}
	}

	// 자동이체 조회
	@Override
	public List<AutoTransferDTO> AutoTransferCheck(String acNumber,String aState)
			throws ServletException, IOException {
		List<AutoTransferDTO> list = new ArrayList<AutoTransferDTO>();
		// 정상 일때의 값을 뿌려줌
		if("using".equals(aState)) {
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("aState", aState);
			map.put("acNumber", acNumber);
			System.out.println("map(using) : " + map);
			list = dao.autoTransferCheck(map);
		}
		// 해지 상태일때의 값을 뿌려줌
		else if("unusing".equals(aState)) {
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("aState", aState);
			map.put("acNumber", acNumber);
			System.out.println("map(unusing) : " + map);
			list = dao.autoTransferCheck(map);
		}
		// 전체 상태가 u가 들어간 모든값을 뿌려줌
		else if("u".equals(aState)){
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("aState", aState);
			map.put("acNumber", acNumber);
			System.out.println("map(all) : " + map);
			list = dao.autoTransferCheckall(map);
		}
		return list;
	}

	// 자동이체 해지
	@Override
	public void autoTransferCancel(int aNum) 
			throws ServletException, IOException {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("aNum", aNum);
		map.put("aState", "unusing");
		dao.autoTransferCancel(map);
	}
	
	// id로 자동이체내역 조회
	@Override
	public List<AutoTransferListDTO> transferList(String id)
			throws ServletException, IOException {
		return dao.transferList(id);
	}
	
	// id로 자동이체 조회 
	@Override
	public List<AutoTransferDTO> autoTransferList(String id) 
			throws ServletException, IOException {
		return dao.autoTransferListbyid(id);
	}
	
	// 자동이체(상세) 단건 조회 (상세페이지 고유번호)
	@Override
	public AutoTransferDTO selectOne(int aNum) 
			throws ServletException, IOException {
		return dao.selectOne(aNum);
	}

	// 자동이체 수정
	@Override
	public void updatedirectlyAutoTransfer(AutoTransferDTO dto)
			throws ServletException, IOException {
		dao.updatedirectlyAutoTransfer(dto);
	}

	// 이체한도 수정
	@Override
	public void updatetrsfLimit(AccountDTO dto) 
			throws ServletException, IOException {
		dao.updatetrsfLimit(dto);
	}
	
	
	// 공지사항
	@Override
	public List<NoticeDTO> noticeList(HttpServletRequest req, Model model)
			throws ServletException,IOException {
		return dao.noticeList();
	}

	// 공지사항상세페이지
	@Override
	public NoticeDTO checkonenotice(int nNum) 
			throws ServletException, IOException {
		return dao.checkonenotice(nNum);
	}

	// 공지사항 수정 
	@Override
	public void changenotice(NoticeDTO dto) 
			throws ServletException, IOException {
		dao.changenotice(dto);
	}

	// 공지사항 삭제
	@Override
	public void deletenotice(int nNum) 
			throws ServletException, IOException {
		
		dao.deletenotice(nNum);
	}

	// 공지사항 추가
	@Override
	public void addnotice(NoticeDTO dto) 
			throws ServletException, IOException {
		String nShow = "N";
		dto.setNShow(nShow);
		dao.addnotice(dto);
	}

	// 고객 상세페이지(조회수를 위한)
	@Override
	public NoticeDTO csboardDetail(int nNum) 
			throws ServletException, IOException {
		dao.updatecount(nNum);
		return dao.csboardDetail(nNum);
	}

	

	

	
	
}
