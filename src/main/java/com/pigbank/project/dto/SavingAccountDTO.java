package com.pigbank.project.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;


@Entity
@Table(name="s_account_tbl")
@Data
public class SavingAccountDTO {
	
	@Id
	private int sNum;
	private long acNumber;
	private String spdname;
	private int samount;
	private int sexpAmount;
	private Date sendDate;
	private Date sjoinDate;
	private long sdeAccount;
	private int strsfCycle;
	
	//계좌 개설을 위한 변수
	private String id;
	private String acPwd;
	private int speriod;
	private long withdrawAcNumber;
}
