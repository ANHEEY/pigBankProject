package com.pigbank.project.dto;

import lombok.Data;

@Data   //API를 통해 전달받은 데이터를 담은 DTO
public class FundAPIDTO {
    String isinCd;      // 고유번호
    String itmsNm;      // 종목명
    String clpr;        // 현재가
    String vs;          // 전일비
    String fltRt;       // 등락율
    String trqu;        // 거래량
    String trPrc;       // 거래대금
    String nPptTotAmt;  // 순자산

}
