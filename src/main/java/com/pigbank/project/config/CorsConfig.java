package com.pigbank.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@Configuration
public class CorsConfig {

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);	//내 서버가 응답시 json을 자바스크립트에서 처리할 수 있게 설정
		config.addAllowedOrigin("*");	//모든 ip에 응답을 허용
		config.addAllowedHeader("*");	//모든 header에 응답을 허용
		config.addAllowedMethod("*");	//모든 post, get, put,delete, petch 요청을 허용
		config.addExposedHeader("Authorization");
		config.setMaxAge(3600L);
		
		source.registerCorsConfiguration("/api/**", config);	//	/api/** => 컨트롤러의 매핑 url
		
		return new CorsFilter(source);
		
	}
}
