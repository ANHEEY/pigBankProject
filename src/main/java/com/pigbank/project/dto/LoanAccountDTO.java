package com.pigbank.project.dto;



import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
// 테이블명 잘못 적어놓아 수정했습니다. 테이블명은 신중히 적어야합니다. 전체적으로 다 에러나요.
@Table(name="l_account_tbl")
@Data
public class LoanAccountDTO {
   
   @Id
   private long lnum;
   private long acNumber;
   private String lpdName;
   private String id;
   private int lprincipal;
   private String lpurpose;
   private String lincome;
   private String lstate;
   private Date lreqDate;
   private int acPwd;
   private long trsfLimit;
   private String lReason;
   private String acState;
   
   // 중도해지시 필요한 정보를 불러오기 위한 추가 변수
   private double lrate;
   private double lcxlRate;
   private int acBalance;
   private Date lstartDate;
   private Date lendDate;
   private int lperiod; 
   private int cancelFee;
   
   // 상세 조회를 위한 추가 변수
   private String ltype;
   
}