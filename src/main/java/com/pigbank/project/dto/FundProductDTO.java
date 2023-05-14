package com.pigbank.project.dto;

import lombok.Data;


import java.sql.Date;
@Data
public class FundProductDTO {
    // 펀드 join하여 조회할때 사용하는 dto , 테이블 지정 안함.
    // f_account_tbl (펀드 계좌 테이블)column
    private String id;
    private int fNum;       // PK, f_detail_tbl FK
    private long fAcNumber;
    private int fBalance;
    private Date fNewDate;
    private Date fLastDate;
    private int fAcPwd;
    private int fTrsfLimit;

    // f_detail_tbl(펀드 거래 내역 테이블) column
    private int fTransNum;      // PK ,f_having_tbl FK
    private Date fTransDate;
    private String fPdName;
    private int fBuyPrice;
    private int fSellPrice;
    private int fTotal;
    private int fCount;
    private String fDetailState;

    // f_having_tbl (매수한 펀드 보유 리스트) column
    private int fHavingNum;    // PK
    private long fNowPrice;
    private int fNowProfit;
    private String fProfit;
    private long fNowTotal;
    private int fHavingCnt;
    private long fPrincipal;

    // 펀드계좌 생성할때 필요하여 account 정보 추가
    private long acNumber;
    private int acBalance;

    //API를 통해 전달받은 데이터
    private String isinCd;      // 고유번호
    private String itmsNm;      // 종목명
    private String clpr;        // 현재가
    private String vs;          // 전일비
    private String fltRt;       // 등락율
    private String trqu;        // 거래량
    private String trPrc;       // 거래대금
    private String nPptTotAmt;  // 순자산
}