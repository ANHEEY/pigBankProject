
# PigBankProject 🐷 
> **한국소프트웨어인재개발원 126기 Final Team Project**

## ✔️ 프로젝트 소개
pigbank는 중요한 핵심 기능만을 모아 간결하면서도 직관적인 메뉴로 구성된 Rest API 기반의 은행 시스템 웹 사이트를 구현한 프로젝트입니다.
> https://youtu.be/nHA-XNhoJzw

<br/>

## ✔️ 프로젝트 정보
> **프로젝트 기간 :  2023.04.12 ~ 2023.05.16 (4주)** <br/> **프로젝트 설명 :  Rest API 기반의 은행 시스템 프로젝트**

<br/>

## ✔️ 팀 소개 

| 안희연(팀장)  | 장수영(부팀장) | 김주아(팀원) |
| :---: | :---:  | :---: | 
| 프로젝트 총괄<br/>로그인/회원가입<br/>예금관리,예금계산기,예금해지시 이자지급<br/>고객 자산관리 <br/>채팅상담 | 대출 관리 <br/> 대출 신청,  대출 조회<br/>대출금 납부<br/>대출계산기<br/>대출 중도상환<br/>채팅상담 | 라우터 로직 설계(고객)<br/>입출금통장 개설<br/>네이버 SENS API<br/>적금 상품 관리,적금 계좌개설<br/>적금계산기<br/>적금해지시 이자지급 | 
| 이정재(팀원) | 장혜선(팀원) | 추호석(팀원) | 
| AWS RDS 환경구축<br/>계좌이체<br/>자동이체<br/>Spring Scheduler<br/>캘린더<br/>공지사항<br/>관리자-이체내역, 계좌검색 | 라우터 로직 설계(관리자)<br/>펀드 계좌 개설<br/>펀드 리스트 조회<br/>펀드 매수, 매도<br/>펀드 거래, 보유내역<br/>관리자 - 고객 정보 조회, 탈퇴 요청 관리 | 형상관리(GIT/GITHUB)<br/>환율 조회<br/>환율계산기<br/>계좌 조회 관리<br/>계좌 거래 내역 상세<br/>관리자 - 계좌, 이체 내역,휴면 계좌 조회 | 

---
<div align=center><h2>📚 STACKS</h2></div>

## ✅ Environment
<div align=center>
  <img src="https://img.shields.io/badge/eclipse-2C2255?style=for-the-badge&logo=eclipseide&logoColor=white">
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
  <img src="https://img.shields.io/badge/intellij idea-000000?style=for-the-badge&logo=intellijidea&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> 
</div>


## ✅ Front-end
<div align=center>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">
  <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">
</div>

## ✅ Back-end
<div align=center>
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/spring5-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
  <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
  <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
  <img src="https://img.shields.io/badge/apache tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white">
  <img src="https://img.shields.io/badge/oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

---

### ✔️ Versions 
- java : 1.8
- springBoot: 2.7.11
- Django : 4.2.1
- Python 3.9.16
- React : 18.2.0

---

### ✔️ 적용 기술
- AWS 클라우드 기반 DB관리
- Spring Security :  BCrypt 암호화를 적용
- JWT(Json Web Token) : 유저(관리자 또는 고객 ) 식별 및 인증
- Rest API : CRUD연산을 수행하기 위해 URI 요청 전달
- NAVER SENSE API : SMS 메시지 알림 기능 구현
- Full Calendar :  자동이체 구현
- 공공데이터 API : 펀드증권상품 시세정보(ETF) open api를 JSON형태의 오픈 포맷으로 받아 서비스 개발에 활용 
- Django : django-rest-framework를 이용하여 React에서 전달한 요청을 처리하여 가공한 데이터를 React 서버로 전송
- Jsoup Web Crawling : 웹크롤링을 이용하여 환율 정보데이터를 수집, DB에 실시간으로 업데이트 

---

### ✔️ 주요 기능
- 로그인/회원가입
- 입출금 계좌 개설
- 예금상품 가입, 관리, 예금 해지 시 이자 지금, 예금 계산기
- 적금상품 가입, 관리, 적금 계산기, 적금 해지 시 이자 지급
- 대출 신청, 관리,조회, 대출금 납부, 대출 계산기, 대출 중도상환
- 펀드 계좌 개설 , etf 펀드 리스트 조회 ,ETF 상품 매수 /매도 , 펀드 거래&보유내역 조회
- 환율 조회, 환율 계산기
- 계좌이체, 자동이체
- 계좌 조회, 거래내역 상세 확인
- 채팅상담 

---

### ✔️ 디렉토리 구조
```bash
├── README.md
├── package-lock.json
├── package.json
├── src : spring_boot back-end
│   ├── main
│   │   ├── java/com/pigbank/project
│   │   │     ├── config : security, jwt 설정 정보 폴더
│   │   │     ├── controller : 컨트롤러 정보 폴더
│   │   │     ├── dao : 매퍼 dao 정보 폴더
│   │   │     ├── dto : 모델 dto 정보 폴더
│   │   │     ├── exception : 예외처리 정보 폴더
│   │   │     ├── service : 컨트롤러 서비스 정보 폴더 
│   │   │     ├── sms : naver sense api 서비스 설정 정보 폴더
│   │   │     └── util : 이메일 체크 정보 폴더
│   │   ├── PigBankTeamProjectApplication.java 
│   ├── resources
│   │   ├── mappers : 매퍼 xml 정보 폴더
│   │   ├── application.properties
│   ├── test/java/com.pigbank/project
│   ├── package-lock.json
│   └── packag.json
├── fundWeb : django back-end
│   ├── fundWeb : django 프로젝트 디렉토리
│   ├── myfundApp : 펀드상품 정보 app
│   └── manage.py
└── front : react front-end
    ├── public
    ├── src 
    │   ├── admin : 관리자 페이지 컴포넌트 정보
    │   │    ├── components : 
    │   │    │    ├── common : main, header , menubar 페이지에서 고정될 컴포넌트의 디렉토리 
    │   │    │    │    └── route : 이동할 컴포넌트들의 경로를 담은 디렉토리
    │   │    │    └── contents : 재사용가능한 컴포넌트를 담은 디렉토리
    │   │    └── resources : css,image 등등의 자료 디렉토리
    │   ├── customer : 고객 페이지 컴포넌트 정보 
    │   │    ├── components : 
    │   │    │    ├── common : main, header , menubar 페이지에서 고정될 컴포넌트의 디렉토리 
    │   │    │    │    └── route : 이동할 컴포넌트들의 경로를 담은 디렉토리
    │   │    │    └── contents : 재사용가능한 컴포넌트를 담은 디렉토리
    │   │    └── resources : css,image 등등의 자료 디렉토리
    │   └── App.js
    ├── package-lock.json
    └── packag.json


```
