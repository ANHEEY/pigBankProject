package com.pigbank.project.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="deposit_product")
@Data
public class DepositProductDTO {
	
	@Id
	private String dpdName;
	private int dperiod;
	private int drate;
	private String dcontent; 
	private int dmin;
	private int dmax;
	private int dcxlRate;
	

}
