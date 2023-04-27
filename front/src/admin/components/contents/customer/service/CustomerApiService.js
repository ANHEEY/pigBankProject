import axios from "axios";

const CONTROLLER_API = "http://localhost:8081/admin/";
class CustomerApiService{
    // 고객 정보 목록
    listCustomer(){
        console.log('관리자 | 고객 목록 ')
        return axios.get(CONTROLLER_API + 'listCustomerAll');
    }
    // 고객 정보 ( 상세페이지 )
    infoCustomer(id){
        console.log('관리자  | 고객 상세페이지')
        return axios.get(CONTROLLER_API  + 'detailCustomer/' +  id)
    }
    // 고객 정보 (고객의 계좌 목록)
    listAccount(id){
        console.log('관리자 | 고객 계좌 목록')
        return axios.get(CONTROLLER_API + 'detailCustomerAccount/' + id)
    }

    // 탈퇴요청 고객 목록
    listWithdrawal(){
        console.log('관리자 | 탈퇴요청 고객 목록')
        return axios.get(CONTROLLER_API + 'listWithdrawal');
    }
    // 탈퇴 승인으로 변경
    updateCustomerState(id){
        console.log('관리자 | 탈퇴 승인으로 변경')
        return axios.post(CONTROLLER_API + 'updateCustomerState/' + id)
    }
}
export default new CustomerApiService();