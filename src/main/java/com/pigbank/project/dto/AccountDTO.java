package com.pigbank.project.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="account_tbl")
@Data
public class AccountDTO {
	
	@Id
	private long acNumber;
	private String id;
	private String bankName;
	private String acState;
	private long acBalance;
	private String acType;
	private int acPwd;
	private Date newDate; 
	private Date lastDate;
	private long trsfLimit;
	
	// 고객에서 조인한 이름
	private String name;
	
}
