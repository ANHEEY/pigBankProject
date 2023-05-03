package com.pigbank.project.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="chuexchange_tbl2")
@Data
public class ExchangeRateListDTO {
	
	@Id
	private int exNo;
	private String name;
    private double price;
    private double buy;
    private double sell;
    private double send;
    private double receive;
    private Date exDate;
	
}
