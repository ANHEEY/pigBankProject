import React, { Component } from "react";
import { Button,Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset} from "@fortawesome/free-solid-svg-icons";


class ChatComponent extends Component{
    
    render(){
        const chat = ()=>{
            window.location.href = "http://192.168.0.17:3003";
        }
        return(
            <div className="component-div">
                <h1><FontAwesomeIcon icon={faHeadset}/> 채팅상담</h1>
                <br/><br/>
                <Button variant="success" size='lg' style={{background:"green", color:"white"}} onClick={chat}>채팅 상담 시작하기</Button>     
            </div>            
        )
    }
}
export default ChatComponent;