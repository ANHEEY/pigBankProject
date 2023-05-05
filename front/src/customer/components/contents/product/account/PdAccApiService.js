import axios from "axios";

const Product_Account_API_URL = "http://localhost:8081/";

class PdAccApiService {

    // 입출금계좌 개설
    pdAccAdd(acInfo) {
        console.log('pdAccAdd 호출')
        return axios.post(Product_Account_API_URL + "custAInsert", acInfo);
    }
}
export default new PdAccApiService();