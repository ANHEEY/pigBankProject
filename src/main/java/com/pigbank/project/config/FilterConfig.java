package com.pigbank.project.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.pigbank.project.filter.PigFilter;


@Configuration
public class FilterConfig {

	@Bean
	FilterRegistrationBean<PigFilter> pigFilter(){
		
		FilterRegistrationBean<PigFilter> bean = new FilterRegistrationBean<>(new PigFilter());
		bean.addUrlPatterns("/*");
		bean.setOrder(0);	//낮은 번호가 필터중에서 가장 먼저 실행됨
		
		return bean;
	}
	
//	@Bean
//	FilterRegistrationBean<MyFilter2> filter2(){
//		
//		FilterRegistrationBean<MyFilter2> bean = new FilterRegistrationBean<>(new MyFilter2());
//		bean.addUrlPatterns("/*");
//		bean.setOrder(1);	//낮은 번호가 필터중에서 가장 먼저 실행됨
//		
//		return bean;
//	}
	
//	@Bean
//	FilterRegistrationBean<MyFilter3> filter3(){
//		
//		FilterRegistrationBean<MyFilter3> bean = new FilterRegistrationBean<>(new MyFilter3());
//		bean.addUrlPatterns("/*");
//		bean.setOrder(2);	//낮은 번호가 필터중에서 가장 먼저 실행됨
//		
//		return bean;
//	}
}
