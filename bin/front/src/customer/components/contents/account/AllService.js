import axios from 'axios';  // npm install -f axios@^1.3.5


// - ApiService는 스프링 부트 서버(보통 'http://localhost:8081/' 으로 열린다.)와 연결해주는 역할을 한다.
// - 리액트에서 무언가 요청을 하면 이를 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴 이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해선 Axios를 사용한다. 기존 HTML이나 JSP에서 사용한 Ajax 역할을 한다고 생각하면 된다.
// - npm install -f axios@^1.3.5

const savingAccount = "http://localhost:8081/savingAccount";
const loanAccount = "http://localhost:8081/loanAccount";
const depositAccount = "http://localhost:8081/depositAccount";

class AllService {
    fetchDeposit() {
      console.log('예금계좌호출!!')
      return axios.get(depositAccount);
    }
    fetchLoan() {
      console.log('대출계좌호출!!')
      return axios.get(loanAccount);
    }
    fetchSaving() {
      console.log('적금계좌호출!!')
      return axios.get(savingAccount);
    }
  }


export default new AllService();