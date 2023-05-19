package com.pigbank.project.sms;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SmsResponse {

	private String requestId;
	private LocalDateTime requestTime;
    private String statusCode;
    private String statusName;
    private int randomNumber; // 인증번호 추가
}
