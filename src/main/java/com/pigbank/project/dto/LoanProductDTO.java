package com.pigbank.project.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="loan_product")
@Data
public class LoanProductDTO {
	
	@Id
	private String lPdName;
	private String lContent;
	private String lGrade;
	private int lMaxPeriod;
	private int lMax;
	private int lRate;
	private String lType;
	private int lCxlRate;
	

}
