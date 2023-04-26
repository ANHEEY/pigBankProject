package com.pigbank.project.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.dto.CustomerDTO;
import com.pigbank.project.service.HyeServiceImpl;

@CrossOrigin(origins="**",maxAge=3600)
@RestController
public class HyeController {
	private static final Logger logger = LoggerFactory.getLogger(HyeController.class);

	@Autowired
	HyeServiceImpl service;
	
	@GetMapping("/listCustomerAll")
	public List<CustomerDTO> listCustomerAll(HttpServletRequest req, Model model)
		throws ServletException, IOException{
		logger.info("== URL || listCustomerAll == ");
		return service.listCustomerAll(req, model);
	}
	@GetMapping("")
	public CustomerDTO detailCustomer(@PathVariable String id)
		throws ServletException , IOException{
		
		return service.detailCustomer(id);
	}
}
