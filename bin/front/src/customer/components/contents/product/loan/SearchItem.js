import { Typography } from "@mui/material";
import React,{useState,useEffect} from "react";
import {Row, Button, ListGroup, Stack} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import PdLoanService from "./PdLoanService";

export default function SearchItem(props){
    const navigate = useNavigate();
    const lpdName = props.inputs;
    const [loanSearchList,setLoanSearchList]=useState([]);

    useEffect(()=>{
        console.log(props);
        console.log(props.inputs);
        console.log(props.searchItem);
        console.log(lpdName);
        PdLoanService.searchLoanProduct(lpdName)
            .then(res=>{
                setLoanSearchList(res.data);
                console.log(res.data);
            })
            .catch(err=>{
                console.log('searchLoanProduct() 오류!!!!', err);
            });
    },[]);

    const style = {
        color: "green",
    }

   // 상세보기 버튼
    const goDetail = (lpdName) => { 
        console.log(lpdName);
        window.localStorage.setItem("lpdName", lpdName);
        navigate('/customer/product/loan/pdLoanDetail');
    }

    return(
        <div className="container">
            <h3>검색한 상품</h3>
            <br />
            {loanSearchList.map(product=>
            <ListGroup variant="flush" key={product.lpdName}>
                <ListGroup.Item style={{borderTop:'1px solid gray'}}>
                <Row>
                    <Stack direction="horizontal" gap={3}>
                    <div>   
                        <p>인터넷뱅킹 | 피그뱅크 | 대출상품</p>
                        <Typography variant="h4" style={{ fontWeight: 'bold'}}>{product.lpdName}</Typography><br />
                        <div>
                            <pre>{product.lsubTitle}</pre>
                        </div>
                        <p>최고 <span style={style}>{product.lmaxPrice ? (product.lmaxPrice).toLocaleString() : ''}만원</span></p>
                    </div>
                    <div className="ms-auto">
                    <Button variant="success" onClick={() => goDetail(product.lpdName)}>신청하기</Button>
                    </div>
                    </Stack>
                </Row>
                </ListGroup.Item>
            </ListGroup>
            )}
    </div>
    );
}