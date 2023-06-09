package com.pigbank.project.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="notice_tbl")
@Data
public class NoticeDTO {

	
	// 공지사항 테이블
	@Id
	private int nNum;
	private String nTitle;
	private String nContent;
	private Date nRegDate;
	private String nShow;
	private int nCount;
}
