package com.pigbank.project.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
// 테이블명 잘못 적어놓아 수정했습니다. 테이블명은 신중히 적어야합니다. 전체적으로 다 에러나요.
@Table(name="l_account_tbl")
@Data
public class LoanAccountDTO {
	
	@Id
	private long lnum;
	private long acNumber;
	private String lPdName;
	private String id;
	private int lPrincipal;
	private int lPeriod; 
	private String lPurpose;
	private String lIncome;
	private String lState;
	private Date lReqDate;
	private Date lEndDate;
	private int acPwd;
	private long trsfLimit;
	
	

}
