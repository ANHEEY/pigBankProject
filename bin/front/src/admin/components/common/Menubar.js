import React from "react"
import '../../resources/css/Menubar.css'
import {useNavigate ,} from 'react-router-dom';

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faUsers,faMoneyCheck,faHeadset} from "@fortawesome/free-solid-svg-icons";
/*
    설치해야 할 것
    1. 사이드바 템플릿
        npm install --save react @trendmicro/react-sidenav  
    2. 폰트어썸 (3개 모두)
        npm i @fortawesome/fontawesome-svg-core
        npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
        npm i @fortawesome/react-fontawesome
    3. react-navigation
        npm install react-navigation
    4. react-router-dom
        npm install react-router-dom
*/
function MenuBar() {
    const navigate = useNavigate(); // useNavigate hook 사용
    function selected(selectedKey) {
      navigate(selectedKey); // navigate 함수를 사용하여 페이지 이동
    }
    return(
        <div className='menubar'>
            <SideNav style={{backgroundColor : '#3abd66'}}
                onSelect={selected}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="admin">
                    <NavItem eventKey="admin" disabled>
                        <NavIcon>
                            {/** 아이콘 추가 */}
                        </NavIcon>
                        <NavText>
                            관리자 
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="product">
                        <NavIcon>
                            <FontAwesomeIcon icon={faMoneyCheck} />
                        </NavIcon>
                        <NavText>
                            상품관리
                        </NavText>
                        <NavItem eventKey="product/loan">
                            <NavText >대출상품</NavText>
                        </NavItem>
                        <NavItem eventKey="product/deposit">
                            <NavText>예금상품</NavText>
                        </NavItem>
                        <NavItem eventKey="product/saving">
                            <NavText>적금상품</NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="acSearch">
                        <NavIcon>
                            <FontAwesomeIcon icon={faSearch}/>
                        </NavIcon>
                        <NavText>조회관리</NavText>
                        <NavItem eventKey="acSearch/acAccount">
                            <NavText>계좌조회</NavText>
                        </NavItem>
                        <NavItem eventKey="acSearch/acDeposit">
                            <NavText>이체내역조회</NavText>
                        </NavItem>
                        <NavItem eventKey="acSearch/acDormant">
                            <NavText>휴면계좌조회</NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="customer">
                        <NavIcon>
                            <FontAwesomeIcon icon={faUsers}/>
                        </NavIcon>
                        <NavText>고객관리</NavText>
                        <NavItem eventKey="customer/withdrawal">
                            <NavText>고객탈퇴요청관리</NavText>
                        </NavItem>
                        <NavItem eventKey="customer/info">
                            <NavText>고객정보</NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="csCenter">
                        <NavIcon>
                            <FontAwesomeIcon icon={faHeadset} />
                        </NavIcon>
                        <NavText>고객센터</NavText>
                        <NavItem eventKey="csCenter/notice">
                            <NavText>공지사항</NavText>
                        </NavItem>
                        <NavItem eventKey="csCenter/chat">
                            <NavText>채팅상담</NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>

    )
}
export default MenuBar;