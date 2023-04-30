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
        console.log('관리자 | 탈퇴 승인으로 변경 update' )
        return axios.put(CONTROLLER_API + 'updateCustomerState/' + id,{id:id})
    }
    // 탈퇴 요청 거절
    rejectCustomerState(id){
        console.log('관리자 |  탈퇴요청거절 update ')
        return axios.put(CONTROLLER_API + 'rejectCustomerState/' + id, {id:id})
    }
}
export default new CustomerApiService();