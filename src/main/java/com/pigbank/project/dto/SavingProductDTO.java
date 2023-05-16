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
	private double scxlrate; // int형으로 되어있어서 double로 고침
	private Date sregdate;

}
