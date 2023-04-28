import axios from "axios";

const ADMIN_API_PRODUCT_SAVING_URL = "http://localhost:8081/";

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

    // selectByPdName(pdSaving) {
    //     console.log('Admin_listByPdName!');
    //     return axios.get(
    //       ADMIN_API_PRODUCT_SAVING_URL + "sListByPdName/" + pdSaving.spdname, 
    //       { params: { pdSaving } } // config 부분에 pdSaving 객체를 명시적으로 포함
    //     );
    //   }

    // Add pdSaving
    addPdSaving(pdSaving) {
        console.log('Admin_pdSavingInsert!');
        return axios.post(ADMIN_API_PRODUCT_SAVING_URL + "adPdInsert", pdSaving);
    }

    // Update

    // Delete

    

}
export default new SavingApiService();