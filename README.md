# PigBankProject
> **한국소프트웨어인재개발원 126기 Final Team Project**
## 프로젝트 소개
pigbank는 중요한 핵심 기능만을 모아 간결하면서도 직관적인 메뉴로 구성된 Rest API 기반의 은행 시스템 웹 사이트를 구현한 프로젝트입니다.
## 프로젝트 정보
> **프로젝트 기간 :  2023.04.12 ~ 2023.05.16 (4주)** <br/> **프로젝트 설명 :  Rest API 기반의 은행 시스템 프로젝트**
##  팀 소개 : 

---
## Stacks
### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             

- 개발 언어: Spring Boot , React, Java, HTML5, CSS3, JavaScript, Python, SQL 
- UI/UX 프레임워크: Bootstrap, FullCalendar, MUI, Axios, React Google Charts, React 
- Router DOM, React PDF, React Calendar, Fortawesome
- 개발도구 : Visual Studio Code , Eclipse, IntelliJ, Sql Developer, DBeaver, ERMaster, Postman 
- Service System : Apache Tomcat, Spring5, JPA, MyBatis, Spring Rest API, Django, Django REST Framework
- 오픈API NAVER SENSE API, 공공데이터 API, Spring Scheduler, Full Calendar, Jsoup Web Crawling
- 형상관리:  git , github 

### Installation
```
git clone
```
### Versions 
- java : 1.8
- springBoot: 2.7.11
- Django : 4.2.1
- Python 3.9.16
- React : 18.2.0

---

### 적용 기술
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

### 주요 기능
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
