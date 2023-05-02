package com.pigbank.project.dto;

import javax.persistence.Entity;

import lombok.Data;

@Data
public class AssetManagementDTO {

	private String id;
	private int lPrincipal;
	private int acBalance;
	private String acType;
}
