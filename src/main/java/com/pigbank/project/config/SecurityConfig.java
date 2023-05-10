package com.pigbank.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;


import lombok.RequiredArgsConstructor;


//권한 설정 : security-context.xml
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity//스프링시큐리티 필터 (SecurityConfig)를 스프링 필터체인에 등록
public class SecurityConfig{

	private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
	private final UserAuthProvider userAuthProvider;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		System.out.println("<<< SecurityConfig - securityFilterChain >>>");

		http
			.exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint)
			.and()
			.addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
			.csrf().disable()
			.httpBasic().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeHttpRequests((requests)->requests
					.antMatchers(HttpMethod.POST,"/login","/customerJoin").permitAll()
					.antMatchers(HttpMethod.GET,"/members","/deposit","/loan","/duplicateId/{id}","/noticeList").permitAll()
					.antMatchers("/emailChk").permitAll()
					.anyRequest().authenticated()
			);    
			
		return http.build();
	}
}
