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
	private String id;
	private int sNum;
	private long acNumber;
	private String sPdName;
	private int sAmount;
	private int sExpAmount;
	private Date sEndDate;
	private Date sJoinDate;
	private long sDeAccount;
	private int sTrsfCycle;
	

}
