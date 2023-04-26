import axios from 'axios';  // npm install -f axios@^1.3.5

const accountList = "http://localhost:8081/Accounts";

class ApiService {
    fetchAccountList() {
        console.log('계좌번호호출')
        return axios.get(accountList);
    }
}

export default new ApiService();
