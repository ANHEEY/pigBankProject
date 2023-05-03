package com.pigbank.project.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="auto_transferReg_tbl")
@Data
public class AutoTransferDTO {

	@Id
	private int aNum;
	private long acNumber;
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
	
	// 조인한 계좌별 이체한도
	private long trsfLimit;
}
