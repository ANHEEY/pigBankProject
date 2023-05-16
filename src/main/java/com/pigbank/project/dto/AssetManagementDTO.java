package com.pigbank.project.dto;

import javax.persistence.Entity;

import lombok.Data;

@Data
public class AssetManagementDTO {

	//고객 자산 관리(예금, 적금, 입출금, 펀드)
	private String id;
	private int lPrincipal;
	private long acBalance;
	private String acType;
	
	//고객 자산 관리 페이지 - 펀드 부분 
	private double fHavingTotal;
	private String fIsinCd;
	
}
