import axios from "axios";

const CONTROLLER_API = "http://localhost:8081/customer/";
const DJANGO_API = "http://localhost:8000/customer/";

class FundAPIService {
  /*************      CONTROLLER_API_SERVICE     *************/
  /*                      펀드 계좌 개설                        */
  // 고객 입출금 계좌 조회
  selectAccountById(id) {
    console.log('고객 입출금 계좌 조회', id)
    return axios.get(CONTROLLER_API + 'selectAccountById/' + id)
  }
  // 펀드 계좌 개설
  insertFundAccount(fundAccountInfo) {
    console.log('펀드 계좌 개설합니다')
    return axios.post(CONTROLLER_API + 'insertFundAccount', fundAccountInfo)
  }

  /*                      펀드 거래 내역                        */
  // 펀드 계좌목록 가져오기 
  listFundAccount(id) {
    console.log(' 펀드 계좌 조회 ', id)
    return axios.get(CONTROLLER_API + 'listFundAccount/' + id)
  }
  // 펀드 계좌의 거래 내역 가져오기 
  fundAccountDetail(fNum) {
    console.log('펀드 계좌의 거래내역 조회', fNum)
    return axios.get(CONTROLLER_API + 'fundAccountDetail/' + fNum)
  }

  /*************      DJANGO_API_SERVICE        *************/
  // 펀드 상품 목록

}
export default new FundAPIService();