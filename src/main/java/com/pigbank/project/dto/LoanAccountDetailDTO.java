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
	
	private int lmonTotal; 		// 납부 금액
	private String acNumber; 	// 출금계좌 
	private String id;			// 사용자 아이디
	private String name; 		// 납부자 이름
	

}