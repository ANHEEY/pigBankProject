package com.pigbank.project.sms;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class SmsRequest {
	
	private String type;
    private String contentType;
    private String countryCode;
    private String from; // 발신자
    private String content;
    private List<MessageDto> messages;
}
