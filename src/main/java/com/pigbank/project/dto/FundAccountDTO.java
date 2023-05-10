package com.pigbank.project.dto;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;
@Entity
@Table(name = "f_account_tbl")
@Data
public class FundAccountDTO {
    @Id
    private int fNum;
    private long fAcNumber;
    private String id;
    private int fBalance;
    private Date fNewDate;
    private Date fLastDate;
    private int fAcPwd;
    private int fTrsfLimit;

}
