package com.pigbank.project.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

// 대출 상환 예정 DTO
@Entity
@Table(name="l_detail_tbl")
@Data
public class LoanAccountDetailDTO {
	@Id
	private int lpaidNum;
	private int lwillPayNum;
	private Date lpayDate;
	
	// 납부거래 내역 조회를 위한 추가 변수
	private int lmonPrice; 		// 납부 회차
	private int lmonRate; 		// 납부 회차
	private int lmonTotal; 		// 납부 금액
	private int lpayTurn; 		// 납부 회차
	private String acNumber; 	// 출금계좌 
	private String id;			// 사용자 아이디
	private int cancelFee; 		// 중도상환수수료 
	private int acBalance;		// 대출금 잔액

}