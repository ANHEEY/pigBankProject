package com.pigbank.project.sms;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Request {
    private String recipientPhoneNumber;
    private String title;
    private String content;

    public Request(String recipientPhoneNumber) {
        this.recipientPhoneNumber = recipientPhoneNumber;
    }
}