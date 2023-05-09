//고객 예금 처리 ApiService
import axios from 'axios';  // npm install -f axios@^1.3.5
import { getAuthToken } from '../../../helpers/axios_helper';

const URL = "http://localhost:8081";

if(getAuthToken() !== null){
    axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
  } else{
    axios.defaults.headers.common['Authorization'] = ``;
  }

class DepositService {

    cusDepositCxlExpInfo(dNum){
        console.log("예금 계좌 해지 예상 조회!!");
        return axios.get(URL+"/cusDepositCxlExpInfo/"+dNum);
    }

    cusDepositCxlReg(cxlInfo){
        console.log("예금 계좌 해지 처리!!");
        console.log("info : ",cxlInfo);
        return axios.post(URL+"/cusDepositCxlReg",cxlInfo);
    }
}

export default new DepositService();