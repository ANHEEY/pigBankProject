package com.pigbank.project.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.pigbank.project.dao.CustomerMapper;

import com.pigbank.project.jwt.JwtAuthenticationFilter;
import com.pigbank.project.jwt.JwtAuthorizationFilter;


//권한 설정 : security-context.xml
@Configuration
@EnableWebSecurity//스프링시큐리티 필터 (SecurityConfig)를 스프링 필터체인에 등록
@EnableGlobalMethodSecurity(securedEnabled=true,prePostEnabled=true)//secured 어노테이션 활성화, preAuthorize/PostAuthorize 어노테이션 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	//@Autowired
	//private CorsConfig corsConfig;
	
	@Autowired
	private CustomerMapper customerMapper;
	
	@Bean	//해당 메서드의 리턴되는 오브젝트를 IOC 컨테이너로 등록해준다.
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
//	@Bean
//    public SuccessHandler successHandler(){
//        return new SuccessHandler();
//    }
	
//	@Autowired
//	private SuccessHandler successHandler;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("스프링시큐리티를 탔다");
		//http.addFilterBefore(new MyFilter3(), SecurityContextPersistenceFilter.class);//나의 필터와 가장 빠른 필터 비교, ....베이직으로 해도됨
		//가장 먼저 실행됨
		http.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)	//세션을 사용하지 않겠다.
			.and()
			//.addFilter(corsConfig.corsFilter())	//cors 정책에서 벗어날 수 있다....아마도? 시큐리티 필터에 등록해서 인증을 받겠다.
			.formLogin().disable()	//formLogin 사용안함
			.httpBasic().disable()//httpBasic 사용안함
			.addFilter(new JwtAuthenticationFilter(authenticationManager()))//반드시 추가
			.addFilter(new JwtAuthorizationFilter(authenticationManager(),customerMapper))//반드시 추가		
			.authorizeRequests()
			.antMatchers("/api/p1/customer/**")
				.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
			.antMatchers("/api/p1/admin/**")
				.access("hasRole('ROLE_ADMIN')")
			.anyRequest().permitAll(); //그 외에는 누구든지 들어와라
//			.anyRequest().permitAll()
//			.and()
//			.formLogin()
//			.loginProcessingUrl("/loginProc")
//			.defaultSuccessUrl("/customer/*");
	
	}
}
