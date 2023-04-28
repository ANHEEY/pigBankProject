import axios from "axios";

const Product_Account_API_URL = "";

class PdAccApiService {

    // 입출금계좌 생성
    pdAccAdd() {
        console.log('pdAccAdd 호출')
        return axios.post(Product_Account_API_URL);
    }
}
export default new PdAccApiService();