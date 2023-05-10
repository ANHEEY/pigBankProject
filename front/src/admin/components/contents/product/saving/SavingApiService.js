import axios from "axios";
import { getAuthToken } from "../../../../../customer/components/helpers/axios_helper";

const ADMIN_API_PRODUCT_SAVING_URL = "http://localhost:8081/";

if(getAuthToken() !== null){
    axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
  } else{
    axios.defaults.headers.common['Authorization'] = ``;
  }

class SavingApiService {

    // List
    fetchPdSaving() {
        console.log('Admin_pdSavingList!');
        return axios.get(ADMIN_API_PRODUCT_SAVING_URL + "adPdSaving");
    }

    // 1건 Select
    selectByPdName(spdname) {
        console.log('Admin_listByPdName!');
        return axios.get(ADMIN_API_PRODUCT_SAVING_URL + "sListByPdName/" + spdname);
    }

    // Add pdSaving
    addPdSaving(pdSaving) {
        console.log('Admin_pdSavingInsert!');
        return axios.post(ADMIN_API_PRODUCT_SAVING_URL + "adPdInsert", pdSaving);
    }

    // Update (put 보안상 취약해 요즘 사용하지 않는다고함.)
    updateSaving(pdSaving) {
        console.log('Admin_pdSavingUpdate');
        console.log(ADMIN_API_PRODUCT_SAVING_URL + "adPdUpdate/" + pdSaving.spdname, pdSaving);
        return axios.post(ADMIN_API_PRODUCT_SAVING_URL + "adPdUpdate/" + pdSaving.spdname, pdSaving);
    }

0
    // Delete
    deleteSaving(spdname) {
        console.log('Admin_pdSavingDelete');
        console.log(ADMIN_API_PRODUCT_SAVING_URL + "adPdDelete/" + spdname)
        return axios.post(ADMIN_API_PRODUCT_SAVING_URL + "adPdDelete/" + spdname);
    }
    

}
export default new SavingApiService();