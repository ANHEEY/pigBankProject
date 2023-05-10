import React, { useEffect, useState } from "react";
import '../../../resources/css/fund/fund-list.css'
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, getId } from "../../helpers/axios_helper";
import axios from "axios";
import FundAPIService from "./service/FundAPIService";

function FundAccountInfo() {
    const navigate = useNavigate();
    const id = getId();
    const [faccount, setFaccount] = useState([]);
    const [pwd, setPwd] = useState('');

    useEffect(() => {
        if (getAuthToken() !== null) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
        } else {
            axios.defaults.headers.common['Authorization'] = ``;
        }
        // 계좌 목록 가져오기
        FundAPIService.listFundAccount(id)
            .then(res => {
                setFaccount(res.data);
            })
            .catch(err => {
                console.log('계좌목록을 가져오지 못함 ', err);
            })
    }, []);
    // 계좌잔액(숫자형)을 천단위에서 , 
    function acBal(acBalance) {
        return acBalance.toLocaleString();
    }
    // 계좌번호 => 문자열로 변환 후 slice
    function acNum(acNumber) {
        const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
        return acNum;
    }
    //계좌 거래상세내역 확인 
    // const viewDetail = (fnum, facPwd) => {
    //     const account = faccount.find((f) => f.fnum === fnum);

    //     if (!account) {
    //         alert("해당 계좌가 존재하지 않습니다.");
    //     } else if (account.facPwd === facPwd) {
    //         const url = `/customer/fund/info/detail/${fnum}`;
    //         const newWindow = window.open(url, "_blank", "width=800,height=600");
    //         if (!newWindow) {
    //             alert("팝업 차단을 해제해주세요.");
    //         }
    //     } else {
    //         alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
    //     }
    // };

    const viewDetail = (fnum, pwd) => {
        if (Number(pwd) === Number(faccount.find(f => f.fnum === fnum).facPwd)) {
            const url = `/customer/fund/info/detail/${fnum}`;
            const newWindow = window.open(url, "_blank", "width=800,height=600");
            if (!newWindow) {
                alert("팝업 차단을 해제해주세요.");
            }
        } else {
            console.log("pwd : " + pwd)
            console.log("facPwd : " + faccount.find(f => f.fnum === fnum).facPwd)
            alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.')
        }
    }
    return (
        // fNum, fAcNumber ,fBalance ,fNewDate ,fLastDate , fAcPwd ,fTrsfLimit :계좌 + 계좌 펀드 거래 내역 리스트
        <div className="fund-div">
            <div className="fund-title">
                펀드계좌 거래 내역
            </div>
            <div className="fund-contents">
                {faccount.length === 0 ? (
                    <div className="facCard no-contents">
                        <table>
                            <thead>
                                <tr>
                                    <th>{id}님의 펀드 계좌목록<hr /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        펀드 계좌가 존재하지 않습니다. 계좌를 먼저 생성하세요.
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <Link to='/customer/fund/account'><button> click ! 펀드 계좌 생성하러 가기</button></Link>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    faccount.map(faccount => (
                        <div className="facCard" key={faccount.fnum}>
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={4}> <span className="id-span">{id}</span> 님의 펀드 계좌<hr /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>계좌번호</th>
                                        <td>
                                            <span>{acNum(faccount.facNumber)}</span>
                                        </td>
                                        <th>계좌개설일</th>
                                        <td>
                                            <span>
                                                {new Date(faccount.fnewDate).getFullYear()}년 &nbsp;
                                                {new Date(faccount.fnewDate).getMonth() + 1}월 &nbsp;
                                                {new Date(faccount.fnewDate).getDate()}일
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>계좌잔액</th>
                                        <td>
                                            <span>{acBal(faccount.fbalance)} 원</span>
                                        </td>
                                        <th>마지막거래일</th>
                                        <td>
                                            {faccount.flastDate === null ?
                                                (<span>마지막거래일이 없습니다</span>) :
                                                (<span>{faccount.flastDate}</span>)
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <hr />
                                            <div>
                                                <input type="password" className="input-field" maxLength={4} name="pwd" onChange={(e) => setPwd(e.target.value)} placeholder="계좌의 비밀번호를 입력하세요" />
                                                <button onClick={() => viewDetail(faccount.fnum, pwd)}>거래내역 보기</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default FundAccountInfo
