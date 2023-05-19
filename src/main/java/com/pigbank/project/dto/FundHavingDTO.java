package com.pigbank.project.dto;

import lombok.Data;

@Data
public class FundHavingDTO {
    //API를 통해 전달받은 데이터
    private String id;

    private String isinCd;      // 고유번호
    private String itmsNm;      // 종목명
    private String clpr;        // 현재가
    private String vs;          // 전일비
    private String fltRt;       // 등락율
    private String trqu;        // 거래량
    private String trPrc;       // 거래대금
    private String nPptTotAmt;  // 순자산
    private String basDt;       // 거래기준일

    // f_having_tbl (매수한 펀드 보유 리스트) column
    private long fhavingNum;    // PK
    private long fnowPrice;
    private long fnowProfit;
    private float fprofit;
    private long fnowTotal;
    private int fhavingCnt;
    private long fprincipal;

    private long ftransNum;      // PK ,f_having_tbl FK
    private long ftotal;

}
