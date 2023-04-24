package com.pigbank.project.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="savings_product")
@Data
public class SavingProductDTO {
	
	@Id
	private String sPdName;
	private String sContent;
	private int sPeriod;
	private int sRate;
	private int sMin;
	private int sMax;
	private int scxlrate;
	

}
