package com.pigbank.project.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="transfer_tbl")
@Data
public class TransferDTO {
	
	
	// 계좌이체 테이블
	@Id
	private int tNum;
	private long acNumber;
	private long tDepositnum;
	private String tDepositBank;
	private String tType;
	private int tAmount;
	private String myMemo;
	private String yourMemo;
	private Date tDate;
	
	// 계좌에서 조인한 비밀번호
	private int acPwd;
}
