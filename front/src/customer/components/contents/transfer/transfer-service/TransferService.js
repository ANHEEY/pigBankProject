import axios from 'axios';  // npm install -f axios@^1.3.5

const allaccountList = "http://localhost:8081/allAccounts"
const accountList = "http://localhost:8081/Accounts";
const insertTransfer = "http://localhost:8081/Transfer";
const AutoInsertTransfer = "http://localhost:8081/autoTransfer";
const AutoTransferCheck = "http://localhost:8081/autoCheck";
const AutoCancel = "http://localhost:8081/cancelauto";
const selectOne = "http://localhost:8081/selectOne";
const updateOne = "http://localhost:8081/updateOne";
const updatetrsfLimit = "http://localhost:8081/updatetrsfLimit";

class ApiService {
    allAccountList() {
        return axios.get(allaccountList);
    }

    fetchAccountList(id) {
        console.log(id);
        return axios.get(accountList, {params: {id: id}});
    }
    save(acNumber) {
        console.log(acNumber)
        return axios.post(insertTransfer, acNumber,
            { headers: {'Content-Type': 'application/json'}}
        );
    }
    autoSave(acnumber) {
        console.log(acnumber)
        return axios.post(AutoInsertTransfer, acnumber,
            { headers: {'Content-Type': 'application/json'}}
        );
    }
    checkList(data) {
        console.log(data)
        return axios.get(AutoTransferCheck, { params: data } ,
            { headers: {'Content-Type': 'application/json'}});
    }
    cancelAuto(anum) {
        console.log(anum)
        return axios.post(AutoCancel , anum,
        { headers: {'Content-Type': 'application/json'}});
    }
    selectOne(anum) {
        console.log(anum)
        return axios.get(selectOne, {
            headers: { 'Content-Type': 'application/json' },
            params: { anum: anum }
          });
    }
    updateOne(datas) {
        console.log(datas)
        return axios.post(updateOne, datas , 
            { headers: {'Content-Type': 'application/json'}})
    }
    updatetrsfLimit(limit) {
        console.log(limit)
        return axios.post(updatetrsfLimit, limit , 
            { headers: {'Content-Type': 'application/json'}});
    }
}

export default new ApiService();
