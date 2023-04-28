import axios from 'axios';  // npm install -f axios@^1.3.5

const accountList = "http://localhost:8081/Accounts";
const insertTransfer = "http://localhost:8081/Transfer";

class ApiService {
    fetchAccountList() {
        return axios.get(accountList);
    }
    save(acNumber) {
        console.log(acNumber)
        return axios.post(insertTransfer, acNumber,
            { headers: {'Content-Type': 'application/json'}}
        );
    }
    
    
}

export default new ApiService();
