import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../resources/css/Header.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';   // npm install axios

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank} from "@fortawesome/free-solid-svg-icons";

function Header() {

    const navigate = useNavigate();

    const logout = (e)=>{
        e.preventDefault();
        alert('로그아웃되었습니다!');
        axios.defaults.headers.common['Authorization'] = ``;
        localStorage.clear();
        navigate('/customer/*');
    }   
        return(
            <header className='header'>
                <div className='logoClass'>
                    <h1>PIG BANK <FontAwesomeIcon icon={faPiggyBank} style={{color: "#ffffff"}} /></h1>
                </div>
                <div className='listClass'>
                    <ul>
                        <Link to = "/admin/*"><li>Home</li></Link>
                        <Link onClick={logout} style={{color:"white",fontWeight:"bold"}}>Logout</Link>
                    </ul>
                </div>
            </header>            
        );
    
}
export default Header;