import axios from "axios";

const CONTROLLER_API = "http://localhost:8081/customer/";
const JANGOVIEW_API = "http://127.0.0.1:8000/fund/";

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
    console.log(' 펀드 계좌 조회 , id : ', id)
    return axios.get(CONTROLLER_API + 'listFundAccount/' + id)
  }
  // 펀드 계좌의 거래 내역 가져오기 
  fundAccountDetail(fnum) {
    console.log('펀드 계좌의 거래내역 조회', fnum)
    return axios.get(CONTROLLER_API + 'fundAccountDetail/' + fnum)
  }
  /*                      펀드 보유 내역                        */
  // 펀드 보유내역 가져오기
  fundHavingList(id) {
    console.log('펀드 보유내역 조회 , id : ', id)
    return axios.get(CONTROLLER_API + 'fundHavingList/' + id);
  }
  /*                      펀드 상품 구매                        */
  fundProductBuy(buyItems){
    console.log('펀드 매수')
    return axios.post(CONTROLLER_API + 'fundBuy',buyItems);
  }
  // 펀드 보유 업데이트 
  updateHavingFund(data){
    console.log('펀드 업데이트');
    return axios.post(CONTROLLER_API + 'updateHavingFund' , data)
  }
  // 업데이트 목록 가져오기 
  fundUpdateHavingList(id){
    console.log('펀드 보유내역 조회 , id : ', id)
    return axios.get(CONTROLLER_API + 'fundUpdateHavingList/' + id);
  }  
  // 매도
  fundProductSell(items){
    console.log('매도')
    return axios.post(CONTROLLER_API + 'fundSell' , items)
  }

  /*************      DJANGO_API_SERVICE        *************/
  /*                      펀드 상품 목록                        */
  // 펀드 상품 목록 JANGOVIEW_API = "http://127.0.0.1:8000/fund/";
  fundProductList(){
    const headers = {
      'Content-type': 'application/json; charset=utf-8;',
      Accept: 'application/json', 
    };
    console.log('펀드상품 목록 출력')
    return axios.get(JANGOVIEW_API,{headers})
  }
  // 펀드 상품 3개월의 데이터를 받아오기  JANGOVIEW_API = "http://127.0.0.1:8000/fund/";
  getFundDetail(key){
    console.log('펀드상품 3개월데이터를 가져옵니다')
    return axios.get(JANGOVIEW_API+'detail/'+key)
  }
  // 업데이트 
  getHavingDetail(data){
    console.log('펀드 업데이트 데이터 가져오는 중 ')
    return axios.get(JANGOVIEW_API +'having',data)
  }
}
export default new FundAPIService();