import React, { useEffect, useState } from "react";
import '../../../../resources/css/fund/fund-list.css'
import { getId } from "../../../helpers/axios_helper";
import axios from "axios";
import FundAPIService from "../service/FundAPIService";

export default function FundBuyAccount({ onSelectAccount }) {
  const [faccount, setFaccount] = useState([]);
  const id = getId();
  const [selectAccount, setSelectAccount] = useState('');
  const [selectAmount, setSelectAmount] = useState('');

  // 계좌번호를 문자열로 변환 후 slice
  function acNum(acNumber) { return acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3); }
  // 계좌잔액을 천단위에서 ,로 변환
  function acBal(acBalance) { return acBalance.toLocaleString(); }

  // 고객 펀드 계좌 가져오기
  useEffect(() => {
    // 계좌 목록 가져오기
    FundAPIService.listFundAccount(id)
      .then(res => {
        setFaccount(res.data);
      })
      .catch(err => {
        console.log('계좌목록을 가져오지 못함 ', err);
      });
  }, []);

  const handleSelectAccount = (e) => {
    
    const select = Number(e.target.value); //fnum 값 숫자형으로 받아오기

    var selected = faccount.filter((all) => {
      console.log(all.fnum);
      const allselect = all.fnum; // faccount에서 나온 모든 fnum
      return allselect === select; // 값 비교
    })

    if (selected) {
      setSelectAmount(selected[0].fbalance); // 한가지 값만 리턴되기때문에 [0]번째 인덱스번호로 값 찾음
      setSelectAccount(selected[0].fnum);
      onSelectAccount(selected[0].fnum, selected[0].fbalance); // 선택된 계좌와 잔액을 부모 컴포넌트로 전달
      console.log("계좌 선택: " + selected[0].fnum + ", 잔액: " + selected[0].fbalance);
    } else {
      console.log("잔액 없음");
    }
  }
  return (
    <div className="select-fundAc">
      {faccount.length === 0 ? (
        <p>펀드 계좌를 생성하세요.</p>
      ) : (
        <select value={selectAccount} onChange={handleSelectAccount}>
          <option>출금계좌를 선택하세요</option>
          {faccount.map((account) => (
            <option key={account.facNumber} value={account.fnum}>
              {acNum(account.facNumber)} {account.fnum} [잔액 : {acBal(account.fbalance)}]
            </option>
          ))}
        </select>
      )}
    </div>
  )
}