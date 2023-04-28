package com.pigbank.project.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="loan_req_tbl")
@Data
public class LoanRequestDTO {
	
	@Id
	private int lreqnum;
	private String lpdName;
	private int lprincipal;
	private int lperiod;
	private String lpurpose;
	private String lincome;
	private String id;
	private String lstate;
	private Date lreqDate;
	private int acPwd;
	private int trsfLimit;
	
}
