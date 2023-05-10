package com.pigbank.project.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="loan_product")
@Data
public class LoanProductDTO {
	
	@Id
	private String lpdName;
	private String lsubTitle;
	private String lcontent;
	private String lgrade;
	private int lmaxPeriod;
	private int lmaxPrice; 
	private double lrate;
	private String ltype;
	private double lcxlRate;
	private Date lregDate;
	
	

}
