package com.pigbank.project.dto;


import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="savings_product")
@Data
public class SavingProductDTO {
	
	@Id
	private String spdname;
	private String scontent;
	private int speriod;
	private double srate;
	private int smin;
	private int smax;
	private int scxlrate;
	private Date sregdate;

}
