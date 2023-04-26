import axios from 'axios';  // npm install -f axios@^1.3.5

const accountList = "http://localhost:8081/Accounts";
const balance = "http://localhost:8081/Balance";

class ApiService {
    fetchAccountList() {
        console.log('계좌번호호출')
        return axios.get(accountList);
    }
    
    fetchBalance(selectedAccount) {
        console.log('잔액조회')
        return axios.get(balance,selectedAccount);
    }
}

export default new ApiService();
