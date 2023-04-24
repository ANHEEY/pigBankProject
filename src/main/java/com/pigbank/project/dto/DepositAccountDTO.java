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
	private String dPdName;
	private int dAmount;
	private int dExpAmount;
	private Date dEndDate;
	private Date dJoinDate;
	private long dDeAccount;
	

}
