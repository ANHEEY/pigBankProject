import React from 'react';
import {Link} from 'react-router-dom';
import '../../resources/css/style.css';
import '../../resources/vendor/bootstrap/css/bootstrap.min.css';
import '../../resources/vendor/bootstrap-icons/bootstrap-icons.css'
import '../../resources/vendor/boxicons/css/boxicons.min.css'
import '../../resources/vendor/glightbox/css/glightbox.min.css'
import '../../resources/vendor/swiper/swiper-bundle.min.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';   // npm install axios

function Topbar () {
    const navigate = useNavigate();

    const logout = (e)=>{
        e.preventDefault();
        alert('로그아웃되었습니다!');
        axios.defaults.headers.common['Authorization'] = ``;
        localStorage.clear();
        navigate('/customer/*');
    } 

    return (
        <section id="topbar" className="d-flex align-items-center">
            <div className="container d-flex justify-content-center justify-content-md-between">
                <div className="contact-info d-flex align-items-center">
                    <Link to="/admin" className="link">admin</Link>
                </div>
                {window.localStorage.getItem("id") === null &&
                <div className="social-links d-none d-md-block">
                    <Link to="/customer/login/login" className="link">Login</Link>
                    <Link to="/customer/Join/Join" className="link">Join</Link>
                </div>
                }
                {window.localStorage.getItem("id") !== null &&
                <div className="social-links d-none d-md-block">
                    <span style={{color:"green",fontWeight:"bold"}}>{window.localStorage.getItem("id")}</span>님 환영합니다
                    <Link onClick={logout}>Logout</Link>
                </div>
                }

            </div>
        </section>
    );
}
export default Topbar;