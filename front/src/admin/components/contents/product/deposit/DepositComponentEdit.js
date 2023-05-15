//관리자 예금 상품 수정 페이지
import React, { useState,useEffect } from "react";
import { Container, Button, Form, Stack } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 css를 적용하기 위함
import AdminDepositService from "./AdminDepositService";
import { useNavigate } from "react-router-dom";


function DepositComponentEdit(){
    const navigate = useNavigate();

    const [depositProduct,setDepositProduct] = useState({
        dpdName:"",
        dcontent:"",
        dperiod:"",
        dmin:"",
        dmax:"",
        drate:"",
        dcxlRate:""
    });

    useEffect(()=>{
        depositDetail();
    },[]);
        
    const depositDetail=() =>{
        AdminDepositService.depositPdDetail(window.localStorage.getItem("dpdName"))
            .then(res=>{
                setDepositProduct(res.data);
                console.log(res.data);
                localStorage.removeItem("dpdName");
            })
            .catch(err => {
                console.log('depositPdDetail() Error!!!', err);
            })
    }    
    
    const onChange = (e) =>{
        const {value, name} = e.target;
    
        setDepositProduct({
            ...depositProduct, 
          [name]: value 
        });
    }

    const updateDepositPd = (e) =>{
        e.preventDefault();

        const product = {
            dpdName:depositProduct.dpdName,
            dcontent:depositProduct.dcontent,
            dperiod:depositProduct.dperiod,
            dmin:depositProduct.dmin,
            dmax:depositProduct.dmax,
        }

        AdminDepositService.depositPdUpdate(product)
            .then(res=>{
                alert("정상적으로 수정되었습니다.");
                navigate('/admin/product/deposit');
            })
            .catch(err => {
                console.log('depositPdUpdate() 에러!!', err);
            });

        
    }

    const cxl = ()=>{
        navigate('/admin/product/deposit');
    }

        return(
            <div className="component-div">
                <div className="admin-title">
                   예금상품수정
                </div>
                <Container><br/><br/>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupDpdName">
                    <Form.Label>* 예금상품명</Form.Label>
                    <Form.Control required type="text" name="dpdName"
                        readOnly value={depositProduct.dpdName} disabled/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupDcontent">
                    <Form.Label>* 예금상품설명</Form.Label>
                    <Form.Control required as="textarea" name="dcontent"
                         value={depositProduct.dcontent} rows={3} placeholder="예금상품설명을 적어주세요." onChange={onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupDperiod">
                    <Form.Label>* 예금 최대 가입기간</Form.Label>
                    <Form.Control required type="number" name="dperiod" min={1}
                        value={depositProduct.dperiod} placeholder="월" onChange={onChange} />
                    <Form.Text className="text-muted">
                        월 단위로 입력해주세요.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupDmin">
                    <Form.Label>* 예금가능 최소금액(만원 단위)</Form.Label>
                    <Form.Control required type="number" name="dmin" min={1}
                        value={depositProduct.dmin} placeholder="만원" onChange={onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupDmax">
                    <Form.Label>* 예금가능 최고금액(만원 단위)</Form.Label>
                    <Form.Control required type="number" name="dmax"
                        value={depositProduct.dmax} placeholder="만원" onChange={onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupDrate">
                    <Form.Label>* 예금이자</Form.Label>
                    <Form.Control required type="number" name="drate"
                        value={depositProduct.drate} placeholder="%" disabled />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formGroupDcxlRate">
                    <Form.Label>* 중도 해지시 금리</Form.Label>
                    <Form.Control type="number" name="dcxlRate"
                        value={depositProduct.dcxlRate} placeholder="%" disabled />
                    </Form.Group> 

                    <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
                        <Button variant="success" onClick={updateDepositPd}>상품수정</Button>
                        <Button variant="outline-secondary" onClick={cxl}>취소</Button>
                    </Stack>
                </Form>
            </Container>   
            </div>
        );
    }

export default DepositComponentEdit;