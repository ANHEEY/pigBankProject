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

    // Add pdSaving
    addPdSaving(pdSaving) {
        console.log('Admin_pdSavingInsert!');
        return axios.post(ADMIN_API_PRODUCT_SAVING_URL + "adPdInsert", pdSaving);
    }

    // 미작성----------------------------------------------------------------------------
    // Update
    updateSaving() {
        console.log('Admin_pdSavingUpdate');
        return axios.put(ADMIN_API_PRODUCT_SAVING_URL + "adPdUpdate");
    }


    // Delete
    deleteSavinc() {
        console.log('Admin_pdSavingDelete');
        return axios.put(ADMIN_API_PRODUCT_SAVING_URL + "adPdDelete");
    }
    

}
export default new SavingApiService();