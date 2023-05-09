package com.pigbank.project.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

// 대출 상환 예정 DTO
@Entity
@Table(name="l_accountPay_tbl")
@Data
public class LoanWillPayDTO {
	@Id
	private int lwillPayNum;
	private int lpayTurn;
	private long lnum;
	private int lmonTotal;
	private int lmonRate;
	private int lmonPrice;
	private String lpayStatus;
	
	private long acNumber;
	private String id;
	

}
