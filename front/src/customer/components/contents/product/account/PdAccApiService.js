import axios from "axios";
import { getAuthToken } from "../../../helpers/axios_helper";

const Product_Account_API_URL = "http://localhost:8081/";

if(getAuthToken() !== null){
    axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
  } else{
    axios.defaults.headers.common['Authorization'] = ``;
  }

class PdAccApiService {

    // 입출금계좌 개설
    pdAccAdd(acInfo) {
        console.log('pdAccAdd 호출')
        return axios.post(Product_Account_API_URL + "custAInsert", acInfo);
    }
}
export default new PdAccApiService();