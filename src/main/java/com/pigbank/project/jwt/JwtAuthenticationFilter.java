package com.pigbank.project.jwt;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pigbank.project.auth.PrincipalDetails;
import com.pigbank.project.dto.CustomerDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor//final오류나면 주기
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;//@RequiredArgsConstructor 추가해야 에러 안남
	
	//	/login 요청을 하면 로그인 시도를 위해서 자동으로 실행되는 함수
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		System.out.println("<<<JwtAuthenticationFilter:로그인 시도중>>>");
		
		// 1. 화면에서 username, password로 로그인해서 DB에 있는지 확인
		// authenticationManager으로 로그인 시도를 하면 PrincipalDetailsService의 loadUserByUsername() 자동 실행      
		// 2. PrincipalDetails가 리턴되면 PrincipalDetails를 세션에 담고(SecurityConfig.java의 권한관리를 위해)      
		// 3. JWT 토큰을 만들어서 응답해주면 됨
		
		try {
			//테스트1 - 포트스맨에서 Body 설정 => x-www-form-urlencoded() 
			//System.out.println(request.getInputStream().toString());
			
			//테스트2 - 포트스맨에서 Body 설정 => x-www-form-urlencoded() => 결과 input => username=hong&password=1234
							//Body 설정 - raw - json => 결과 "username":"hong","password":"1234"
			//BufferedReader br = request.getReader();
			
			//String input = null;
			//while((input = br.readLine()) != null) {
			//	System.out.println("input : "+input);//화면에서 입력받은 값
				
			//}

			//테스트3 -포트스맨에서 Body 설정 - raw - json => 결과 userDTO : UserDTO(id=0, username=hong, password=1234, roles=null)
			ObjectMapper objectMapper = new ObjectMapper();
			CustomerDTO customerDTO = objectMapper.readValue(request.getInputStream(), CustomerDTO.class);
			System.out.println("customerDTO : "+customerDTO);

			//담긴 로그인 정보로 토큰 발생해서
			UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
			 = new UsernamePasswordAuthenticationToken(customerDTO.getId(), customerDTO.getPwd());
			
			//로그인 시도시 인증 : PrincipalDetailsService의 loadUserByUsername() 함수가 호출된 후 
			//인증이 정상이면 authentication에 리턴됨  //정상 : 내가 로그인한 정보와 테이블의 username,password 로그인 정보가 일치함
			Authentication authentication = 
					authenticationManager.authenticate(usernamePasswordAuthenticationToken);
			
			//로그인 성공
			PrincipalDetails principalDetails = (PrincipalDetails)authentication.getPrincipal();
			System.out.println("로그인 성공 = >"+principalDetails.getCustomerDTO().getId());
			//PrincipalDetails에 @Data추가되어있어야 getter 가능
			
			return authentication;
			
			// authentication 객체가 session 영역에 저장해야하고, 그 방법이 return 해주면 됨.
	        // 리턴 이유는 권한 관리를 security가 대신 해주기 해문에 편하려고 하는 거임.
	        // 굳이 JWT 토큰을 사용하면서 세션을 만들 이유가 없음. 근데 단지 권한 처리떄문에 session에 넣어준다.
			}catch(IOException e) {
			e.printStackTrace();
		}
		
		
		return null;
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, 
			FilterChain chain, Authentication authResult) throws IOException, ServletException {
		System.out.println("<<<successfulAuthentication 실행됨 -> 인증이 완료되었다는 뜻>>>");

		PrincipalDetails principalDetails = (PrincipalDetails)authResult.getPrincipal();
		System.out.println("principalDetails : "+principalDetails);
		//RSA 방식 (공개키, 개인키) 말고 Hash 암호 방식 사용
		String jwtToken = JWT.create()
							.withSubject("cors 토큰")
							.withExpiresAt(new Date(System.currentTimeMillis()+(JwtProperties.EXPIRATION_TIME)))//수정1. //토큰 유효시간 
							.withClaim("id", principalDetails.getCustomerDTO().getId())
							.withClaim("name", principalDetails.getCustomerDTO().getName())
							.sign(Algorithm.HMAC512(JwtProperties.SECRET));//수정2. //사인
		System.out.println("jwtToken : "+jwtToken);
		System.out.println("JwtProperties.HEADER_STRING : "+JwtProperties.HEADER_STRING);
		System.out.println("JwtProperties.TOKEN_PREFIX+jwtToken : "+JwtProperties.TOKEN_PREFIX+jwtToken);
		response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtToken);//수정3. 두군데 수정 //(key, value)	}
	}
}