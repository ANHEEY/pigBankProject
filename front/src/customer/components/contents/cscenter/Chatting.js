// 채팅상담
import React from "react";
import { Button,Stack } from 'react-bootstrap';

function Chatting () {

    const chat = ()=>{
        //navigate('http://192.168.0.17:3003');
        window.location.href = "http://192.168.0.17:3003";
    }
    return (
        <div className="container">
            <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
                <Button variant="success" size='lg' style={{background:"green", color:"white"}} onClick={chat}>상담 시작하기</Button>     
            </Stack>
            <br/>
            <br/>
            <br/>
        </div>
    )
}
export default Chatting;