import { Typography } from "@mui/material";
import React,{useState,useEffect} from "react";
import {Form, Col, Row, Button,  ListGroup, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import PdSavingService from "./PdSavingService";

export default function SearchItem(props){
    const navigate = useNavigate();
    const spdname = props.inputs;
    const [savingSearchLists,setSaivngSearchLists]=useState([]);

    useEffect(()=>{
        console.log(props);
        console.log(props.inputs);
        console.log(props.searchItem);
        console.log(spdname);
        PdSavingService.savingSearch(spdname)
            .then(res=>{
                setSaivngSearchLists(res.data);
                console.log(res.data);
            })
            .catch(err=>{
                console.log('savingSearch() Error!!!!',err);
            });
    },[]);

    const style = {
        color: "green",
    }

    const label = {
        textAlign: "center",
    }

    // onClick → sPdDetail
    const sPdDetail=(spdname)=> { 
        window.localStorage.setItem("spdname", spdname);
        navigate('/customer/product/saving/pdSavingDetail');
    }
    return(
        <div className="container">
            <h3>검색한 상품</h3>
            {savingSearchLists.map(product=>
            <ListGroup variant="flush" key={product.spdname}>
                <ListGroup.Item style={{borderTop:'1px solid gray'}}>
                <Row>
                    <Stack direction="horizontal" gap={3}>
                    <div>
                            <p>인터넷뱅킹 | 피그뱅크 | 적금상품</p>
                            <Typography variant="h4" style={{ fontWeight: 'bold'}}>{product.spdname}</Typography><br />
                            <p>{product.scontent}</p>
                            <p>금리 <span style={style}>{product.srate}%</span></p>
                    </div>
                    <div className="ms-auto">
                    <Button variant="success" onClick={()=>sPdDetail(product.spdname)}>신청하기</Button>
                    </div>
                    </Stack>
                </Row>
                </ListGroup.Item>
            </ListGroup>
            )}
    </div>
    );
}