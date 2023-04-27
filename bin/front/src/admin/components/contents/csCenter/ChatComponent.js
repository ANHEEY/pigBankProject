import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset} from "@fortawesome/free-solid-svg-icons";


class ChatComponent extends Component{
    render(){
        return(
            <div className="component-div">
                <h1><FontAwesomeIcon icon={faHeadset}/> 채팅상담</h1>
                <span>이곳엔 채팅창이 나올 예정입니다 </span>
            </div>            
        )
    }
}
export default ChatComponent;