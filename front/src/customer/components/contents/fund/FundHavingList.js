import React from "react";
import '../../../resources/css/fund/fund-list.css'

function FundHavingList() {
    return (
        <div className="fund-div">
            <div className="fund-title">
                펀드 보유 내역
            </div>
            <div className="fund-contents">
                <ul>
                    <li>매수한 펀드 내역 목록 출력하기</li>
                    <li>[평가금액, 원금, 현재가, 수익률] + 매도버튼 </li>
                    <li>매도시  현재페이지 유지</li>
                </ul>
                <table>
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>평가금액</th>
                            <th>원금</th>
                            <th>현재가</th>
                            <th>수익률</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button>매도</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default FundHavingList
