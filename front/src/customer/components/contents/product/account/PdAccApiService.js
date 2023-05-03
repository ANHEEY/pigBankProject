import axios from "axios";

const Product_Account_API_URL = "http://localhost:8081/";

class PdAccApiService {

    // // 1건 고객정보 조회
    // custInfoById(id) {
    //     console.log('custInfoById!!')
    //     return axios.post(Product_Account_API_URL + "custInfoById/" + id, id);
    // }

    // 입출금계좌 생성
    pdAccAdd(custSaving) {
        console.log('pdAccAdd 호출')
        return axios.post(Product_Account_API_URL + "custAInsert", custSaving);
    }
}
export default new PdAccApiService();