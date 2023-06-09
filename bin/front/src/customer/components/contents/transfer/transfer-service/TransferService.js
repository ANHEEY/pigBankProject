import axios from 'axios';  // npm install -f axios@^1.3.5
import { getAuthToken } from '../../../helpers/axios_helper';

const allaccountList = "http://localhost:8081/allAccounts"
const accountList = "http://localhost:8081/Accounts";
const insertTransfer = "http://localhost:8081/Transfer";
const insertOtherTrnasfer = "http://localhost:8081/OtherTransfer";
const AutoInsertTransfer = "http://localhost:8081/autoTransfer";
const AutoTransferCheck = "http://localhost:8081/autoCheck";
const AutoCancel = "http://localhost:8081/cancelauto";
const selectOne = "http://localhost:8081/selectOne";
const updateOne = "http://localhost:8081/updateOne";
const updatetrsfLimit = "http://localhost:8081/updatetrsfLimit";
const autoList = "http://localhost:8081/autotransferList";
const trsfList = "http://localhost:8081/trsferList";

if(getAuthToken() !== null){
    axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
  } else{
    axios.defaults.headers.common['Authorization'] = ``;
  }

class ApiService {
    allAccountList() {
        return axios.get(allaccountList);
    }

    fetchAccountList(id) {
        return axios.get(accountList, {params: {id: id}});
    }

    transferList(id) {
        return axios.get(trsfList, {params: {id: id}});
    }

    autotransferList(id) {
        return axios.get(autoList, {params: {id: id}});
    }

    save(acNumber) {
        return axios.post(insertTransfer, acNumber,
            { headers: {'Content-Type': 'application/json'}}
        );
    }
    othersave(acNumber) {
        return axios.post(insertOtherTrnasfer, acNumber,
            { headers: {'Content-Type': 'application/json'}}
        );
    }

    autoSave(acnumber) {
        return axios.post(AutoInsertTransfer, acnumber,
            { headers: {'Content-Type': 'application/json'}}
        );
    }
    checkList(data) {
        return axios.get(AutoTransferCheck, { params: data } ,
            { headers: {'Content-Type': 'application/json'}});
    }
    cancelAuto(anum) {
        return axios.post(AutoCancel , anum,
        { headers: {'Content-Type': 'application/json'}});
    }
    selectOne(anum) {
        return axios.get(selectOne, {
            headers: { 'Content-Type': 'application/json' },
            params: { anum: anum }
          });
    }
    updateOne(datas) {
        return axios.post(updateOne, datas , 
            { headers: {'Content-Type': 'application/json'}})
    }
    updatetrsfLimit(limit) {
        return axios.post(updatetrsfLimit, limit , 
            { headers: {'Content-Type': 'application/json'}});
    }
}

export default new ApiService();
