package com.pigbank.project.dto;

import java.sql.Date;

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
   private double drate;
   private String dcontent; 
   private int dmin;
   private int dmax;
   private double dcxlRate;
   private Date dregDate;

}