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
	private int dNum;
	private long acNumber;
	private String dpdName;
	private long damount;
	private long dexpAmount;
	private Date dendDate;
	private Date djoinDate;
	private long ddeAccount;
	
	//예금 계좌 개설을 위한 변수
	private String id;
	private String acPwd;
	private int dperiod;
	private long withdrawAcNumber;
	
}
