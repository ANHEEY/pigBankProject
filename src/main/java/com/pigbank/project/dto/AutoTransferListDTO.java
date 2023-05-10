package com.pigbank.project.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="auto_transfer_tbl ")
@Data
public class AutoTransferListDTO {

	
	// 자동이체 내역 테이블
	@Id
	private int atNum;
	private int aNum;
	private Date atDate;
	private String atResult;
	
	// AutoTransferDTO 테이블에서 조인한 은행명
	private String aDepositBank;
	// AutoTransferDTO 테이블에서 조인한 계좌이체금액
	private int aDepositAmount;
	
}
