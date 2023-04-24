import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../resources/css/Header.css'

// 폰트어썸
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank} from "@fortawesome/free-solid-svg-icons";

class Header extends Component{
    render(){
        return(
            <header className='header'>
                <div className='logoClass'>
                    <h1>PIG BANK <FontAwesomeIcon icon={faPiggyBank} style={{color: "#ffffff"}} /></h1>
                </div>
                <div className='listClass'>
                    <ul>
                        <Link to = "/"><li>Home</li></Link>
                        <Link to = "/logout"><li>Logout</li></Link>
                    </ul>
                </div>
            </header>            
        )
    }
}
export default Header;