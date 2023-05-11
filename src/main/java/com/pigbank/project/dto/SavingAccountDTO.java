package com.pigbank.project.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;


@Entity
@Table(name="s_account_tbl")
@Data
public class SavingAccountDTO {
	
	@Id
	private int sNum;
	private long acNumber;
<<<<<<< Updated upstream
	private String spdname;
	private int samount;
	private int sexpAmount;
	private Date sendDate;
	private Date sjoinDate;
	private long sdeAccount;
	private Date sstartDate;
=======
	private String sPdName;
	private int sAmount;
	private int sExpAmount;
	private Date sEndDate;
	private Date sJoinDate;
	private long sDeAccount;
	private int sTrsfCycle;
	private String acState;
>>>>>>> Stashed changes
	
	//계좌 개설을 위한 변수
	private String id;
	private String acPwd;
	private int speriod;
	private long withdrawAcNumber;
	
	// 자동이체를 위한 변수 (적금기준으로 주석작성)
	private int aNum;
	private long aDepositnum;	
	private String aDepositBank;
	private int aDepositAmount;  
	private int aTransferCycle; 
	private Date aStartDate; 	
	private Date aEndDate;		
	private Date aRegDate; 	
	private Date aCancelDate;	 
	private String aState; 		
	private String myMemo;		 
	private String yourMemo;	
	private int aUpdate;
	
	//적금 계좌 상세 정보 페이지를 위한 변수
	private long acBalance;
	
	// 중도해지 상세페이지를 위한 변수
	private int scxlrate;
}
