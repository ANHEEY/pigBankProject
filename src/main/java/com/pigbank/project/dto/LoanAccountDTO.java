package com.pigbank.project.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="loan_req_tbl")
@Data
public class LoanAccountDTO {
	
	@Id
	private long lReqNum;
	private long acNumber;
	private String lPdName;
	private String id;
	private int lAmount;
	private int lPeriod; 
	private String lPurpose;
	private String lIncome;
	private String lState;
	private Date lReqDate;
	private int acPwd;
	private long trsfLimit;
	
	

}
