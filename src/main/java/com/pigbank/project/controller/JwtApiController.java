package com.pigbank.project.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtApiController {

	//localhost:8081/home
	@GetMapping("/home")
	public String home() {
		System.out.println("<<< url - home >>>");
		
		return "<h3>home</h3>";
	}
	
	//localhost:8081/token
	@PostMapping("/token")
	public String token() {
		System.out.println("<<<url - token>>>");
		
		return "<h3>token</h3>";
	}
	
}
