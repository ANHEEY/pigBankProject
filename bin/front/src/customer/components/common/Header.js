import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank} from "@fortawesome/free-solid-svg-icons";

import '../../resources/css/style.css';

import 'bootstrap';
import '../../resources/vendor/bootstrap/css/bootstrap.min.css';
import '../../resources/vendor/bootstrap-icons/bootstrap-icons.css'
import '../../resources/vendor/glightbox/css/glightbox.min.css'
import '../../resources/vendor/swiper/swiper-bundle.min.css'
import { Link } from 'react-router-dom';

// npm i bootstrap@5.2.3
// npm install @mui/material @emotion/react @emotion/stylednpm
// npm install react-bootstrap bootstrap
// npm install @mui/joy @emotion/react @emotion/styled

function Header () {
    return (
        <>
        <div> {/* className='fixed-top' */}
            <header id="header" className="d-flex align-items-center">
                <div className="container d-flex align-items-center">
                    <h1 className="logo me-auto">
                        <Link to ="/customer/">PIG BANK<FontAwesomeIcon icon={faPiggyBank}/></Link>
                    </h1>
                    <nav id="navbar" className="navbar">
                        <ul>
                            <li className="dropdown">
                                <Link to ="/customer/account/all">
                                    <span>조회</span> 
                                    <i className="bi bi-chevron-down"></i>
                                </Link>
                                <ul>
                                    <li>
                                        <Link to ="/customer/account/all">전체계좌</Link>
                                    </li>
                                    <li>
                                        <Link to ="/customer/account/account">입출금 통장조회</Link>
                                    </li>
                                    <li>
                                        <Link to ="/customer/account/deposit">예금조회</Link>
                                    </li>
                                    <li>
                                        <Link to ="/customer/account/saving">적금조회</Link>
                                    </li>
                                    <li className="dropdown">
                                        <Link to ="#!">
                                            <span>대출조회</span>
                                            <i className="bi bi-chevron-right"></i>
                                        </Link>
                                        <ul>
                                            <li>
                                                <Link to ="/customer/account/loan_state">대출심사결과조회</Link>
                                            </li>
                                            <li>
                                                <Link to ="/customer/account/loan">대출계좌조회</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to ="/customer/account/sleep">휴면계좌조회</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <Link to ="/customer/trans_deposit">
                                    <span>이체</span> 
                                    <i className="bi bi-chevron-down"></i>
                                </Link>
                                <ul>
                                    <li>
                                        <Link to ="/customer/transfer/trans_deposit">계좌이체</Link>
                                    </li>
                                    <li className="dropdown">
                                        <Link to ="/customer/transfer/auto_trans!">
                                            <span>자동이체</span> 
                                            <i className="bi bi-chevron-right"></i>
                                        </Link>
                                        <ul>
                                            <li>
                                                <Link to ="/customer/transfer/add_auto_trans">자동이체등록</Link>
                                            </li>
                                            <li>
                                                <Link to ="/customer/transfer/auto_trans">자동이체조회</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to ="/customer/transfer/trans_limit">이체한도 조회</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <Link to ="#!">
                                    <span>상품</span> 
                                    <i className="bi bi-chevron-down"></i>
                                </Link>
                                <ul>
                                    <li>
                                        <Link to ="/customer/product/pdDeposit">예금</Link>
                                    </li>
                                    <li>
                                        <Link to ="/customer/product/pdSaving">적금</Link>
                                    </li>
                                    <li>
                                        <Link to ="/customer/product/pdAccount">입출금</Link>
                                    </li>
                                    <li>
                                        <Link to ="/customer/product/loan/pdLoan">대출</Link>
                                    </li>
                                    <li className="dropdown">
                                        <Link to ="/customer/product/fund/pdfundList">
                                            <span>펀드</span> 
                                            <i className="bi bi-chevron-right"></i>
                                        </Link>
                                        <ul>
                                            <li>
                                                <Link to ="/customer/product/fund/open_fund">펀드계좌개설</Link>
                                            </li>
                                            <li>
                                                <Link to ="/customer/product/fund/pdfundList">펀드리스트</Link>
                                            </li>
                                            <li>
                                                <Link to ="/customer/product/fund/pdfundHaving">펀드보유내역</Link>
                                            </li>
                                            <li>
                                                <Link to ="/customer/product/fund/pdfundDetail">펀드거래내역</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <Link to ="/customer/exchangerate/exchange">
                                    <span>환율</span> 
                                    <i className="bi bi-chevron-down"></i>
                                </Link>
                                <ul>
                                    <li>
                                        <Link to ="/customer/exchangerate/exchange">환율조회</Link>
                                    </li>
                                    <li>
                                        <Link to ="/customer/exchangerate/exchange_cal">환율계산기</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <Link to ="/cs_board">
                                    <span>고객센터</span> 
                                    <i className="bi bi-chevron-down"></i>
                                </Link>
                                <ul>
                                    <li><Link to ="/customer/cscenter/cs_board">공지사항</Link></li>
                                    <li><Link to ="/customer/cscenter/chatting">채팅상담</Link></li>
                                </ul>
                            </li>
                            <li className="dropdown"><Link to ="/customer/mypage/mypage"><span>마이페이지</span> <i className="bi bi-chevron-down"></i></Link>
                                <ul>
                                    <li><Link to ="/customer/mypage/mypage">내 정보</Link></li>
                                    <li><Link to ="/customer/mypage/money">자산관리</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                </div>
            </header>
        </div>
        </>
    );
}
export default Header;