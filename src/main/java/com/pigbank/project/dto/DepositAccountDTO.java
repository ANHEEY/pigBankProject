package com.pigbank.project.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="d_account_tbl")
@Data
public class DepositAccountDTO {
	
	@Id
	private String id;
	private int dNum;
	private long acNumber;
	private String dpdName;
	private long damount;
	private long dexpAmount;
	private Date dendDate;
	private Date djoinDate;
	private long ddeAccount;
	
	//예금 계좌 개설을 위한 변수
	private String id;		//가입자 아이디
	private String acPwd;	//예금 계좌 비밀번호
	private int dperiod;	//예금 예치 기간
	private long withdrawAcNumber;	//출금계좌
	
	//예금 해지를 위한 변수 
	private double dcxlRate;	//중도 해지시 금리
	
}
