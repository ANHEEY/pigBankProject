import { Typography } from "@mui/material";
import React,{useState,useEffect} from "react";
import {Form, Col, Row, Button, InputGroup, ListGroup, Stack } from 'react-bootstrap';
import { useNavigate,Link } from "react-router-dom";
import PdDepositService from "./PdDepositService";

export default function SearchItem(props){
    const navigate = useNavigate();
    const dpdName = props.inputs;
    const [depositSearchLists,setDepositSearchLists]=useState([]);

    useEffect(()=>{
        console.log(props);
        console.log(props.inputs);
        console.log(props.searchItem);
        console.log(dpdName);
        PdDepositService.depositSearch(dpdName)
            .then(res=>{
                setDepositSearchLists(res.data);
                console.log(res.data);
            })
            .catch(err=>{
                console.log('depositSearch() 오류!!!!',err);
            });
    },[]);

    const style = {
        color: "green",
    }

    const label = {
        textAlign: "center",
    }

    const dPdDetail=(dpdName)=> { 
        /* window.localStorage.setItem(); */
        window.localStorage.setItem("dpdName", dpdName);
        navigate('/customer/product/deposit/pdDepositDetail');
    }
    return(
        <div className="container">
            <h3>검색한 상품</h3>
            {depositSearchLists.map(product=>
            <ListGroup variant="flush" key={product.dpdName}>
                <ListGroup.Item style={{borderTop:'1px solid gray'}}>
                <Row>
                    <Stack direction="horizontal" gap={3}>
                    <div>
                            <p>인터넷뱅킹 | 피그뱅크 | 예금상품</p>
                            <Typography variant="h4" style={{ fontWeight: 'bold'}}>{product.dpdName}</Typography><br />
                            <p>{product.dcontent}</p>
                            <p>금리 <span style={style}>{product.drate}%</span></p>
                    </div>
                    <div className="ms-auto">
                    <Button variant="success" onClick={()=>dPdDetail(product.dpdName)}>신청하기</Button>
                    </div>
                    </Stack>
                </Row>

                </ListGroup.Item>
            </ListGroup>
            )}
    </div>
    );
}