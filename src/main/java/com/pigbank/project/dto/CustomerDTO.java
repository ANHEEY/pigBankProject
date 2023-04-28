package com.pigbank.project.dto;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="customer")
@Data
public class CustomerDTO {
	
	@Id
	private String id;
	private String pwd;
	private String name;
	private String email;
	private String address;
	private String hp;
	private String grade;
	private String cusState;
	private Timestamp regDate;
	private Date birthday;
	private String authority;
	private String key;
	private String enabled;

	
	

}
