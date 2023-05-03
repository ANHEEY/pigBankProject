package com.pigbank.project.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class WebConfig {

	@Bean
	public FilterRegistrationBean corsFilter() {
		
		System.out.println("<<< WebConfig - corsFilter() >>> ");
		
		// import org.springframework.web.cors 주의(reactive x)
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		// 프론트엔드가 일부 자격증명을 보내면 그것들을 받아들여야 한다.
		CorsConfiguration config = new CorsConfiguration();
		
		System.out.println("<<< WebConfig - 1 >>> ");
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:3000");
		config.setAllowedHeaders(Arrays.asList(
				HttpHeaders.AUTHORIZATION,
				HttpHeaders.CONTENT_TYPE,
				HttpHeaders.ACCEPT
		));
		
		System.out.println("<<< WebConfig - 2 >>> ");
		config.setAllowedMethods(Arrays.asList(
				HttpMethod.GET.name(),
				HttpMethod.POST.name(),
				HttpMethod.PUT.name(),
				HttpMethod.DELETE.name()
		));
		
		config.setMaxAge(3600L);  // 옵션 요청이 수락되는 시간 30분
		source.registerCorsConfiguration("/**", config);  // Spring Security 필터전에 사용하기 위해 요청에 적용
		
		System.out.println("<<< WebConfig - 3 >>> ");		
		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));  // import org.springframework.web.filter.CorsFilter;
		bean.setOrder(-102);  // 가장 낮은 위치
		
		System.out.println("<<< WebConfig - 4 >>> ");	
		return bean;
	}
}
