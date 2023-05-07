package com.pigbank.project.util;

import java.util.Random;

public class EmailChkHandler {

	public static String getKey() {
		// 인증키 부분(랜덤 문자)
		StringBuffer temp = new StringBuffer();
		Random rnd = new Random();
		for(int i=0; i<6; i++) {
			int rIndex = rnd.nextInt(2);
			switch(rIndex) {
			case 0 :
				// A-Z
				temp.append((char) ((int) (rnd.nextInt(26)) + 65));
				break;
			case 1:
				// 0-9
				temp.append((rnd.nextInt(10)));
				break;
			}
		}
		
		return temp.toString();
	}
}
