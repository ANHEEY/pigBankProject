import axios from 'axios';
import { getAuthToken } from '../../../helpers/axios_helper';

const CUSTOMER_API_PRODUCT_SAVING_URL = "http://localhost:8081/";

if(getAuthToken() !== null){
    axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
  } else{
    axios.defaults.headers.common['Authorization'] = ``;
  }

  class SavingService {

    // 중도해지 상세조회(1건 조회)
    savingCloseDetail(acNumer) {
        console.log(acNumer)
        console.log('savingCloseDetail(중도해지 상세) 호출')
        return axios.get(CUSTOMER_API_PRODUCT_SAVING_URL + 'savingCloseDetail/' + acNumer);
    }

    // 중도해지
    closeSaving(sNum) {
        console.log(sNum)
        console.log('closeSaving(적금 중도해지)')
        return axios.post(CUSTOMER_API_PRODUCT_SAVING_URL + 'closeSaving/' + sNum)
    }

  }
  export default new SavingService();