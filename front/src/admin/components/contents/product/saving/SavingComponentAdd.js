import React, { useState } from "react";
import { Container, Button, Form, Stack } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 css를 적용하기 위함
import { IoIosAddCircleOutline } from "react-icons/io";
import SavingApiService from "./SavingApiService";

function SavingComponentAdd(props) {

    const [spdname, setSPdName] = useState('');
    const [scontent, setSContent] = useState('');
    const [speriod, setSPeriod] = useState('');
    const [smin, setSMin] = useState('');
    const [smax, setSMax] = useState('');
    const [srate, setSRate] = useState('');
    const [scxlrate, setSCxlRate] = useState('');
    const [sregdate, setSRegDate] = useState('');
    //const [message, setMessage] = useState(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
        case "spdname":
            setSPdName(value);
            break;
        case "scontent":
            setSContent(value);
            break;
        case "speriod":
            setSPeriod(value);
            break;
        case "smin":
            setSMin(value);
            break;
        case "smax":
            setSMax(value);
            break;
        case "srate":
            setSRate(value);
            break;
        case "scxlrate":
            setSCxlRate(value);
            break;
        case "sregdate":
            setSRegDate(value);
            break;
        default:
            break;
        }
    }

    const savePdsaving = (e) => {
        e.preventDefault();

        // pdSaving으로 setter로 묶음 
        let pdSaving = {
        spdname: spdname,
        scontent: scontent,
        speriod: speriod,
        smin: smin,
        smax: smax,
        srate: srate,
        scxlrate: scxlrate,
        sregdate: sregdate
        };

        SavingApiService.addPdSaving(pdSaving)
        .then(res => {
    //    message(pdSaving.sPdName + '상품이 등록되었습니다.');
           // console.log(message);
            props.history.push('/adPdSaving');
        })
        .catch(err => {
            console.log('addPdSaving() Error!!', err);
        })
  }
    return(
        <div className="component-div">
            <div className="admin-title">
                <IoIosAddCircleOutline /> 적금상품등록
            </div>
            <Container><br/><br/>
                <Form onSubmit={savePdsaving}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 적금상품명</Form.Label>
                    <Form.Control 
                        required 
                        type="text" 
                        name="spdname" 
                        value={spdname} 
                        onChange={onChange} 
                        placeholder="상품명을 입력해주세요." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>* 적금상품설명</Form.Label>
                    <Form.Control 
                        required 
                        as="textarea" 
                        name="scontent" 
                        value={scontent} 
                        onChange={onChange} 
                        rows={3} 
                        placeholder="상품설명을 간략히 적어주세요." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 적금가능 최장기간</Form.Label>
                    <Form.Control 
                        required 
                        type="text" 
                        name="speriod" 
                        value={speriod} 
                        onChange={onChange}
                        placeholder="월" />
                    <Form.Text className="text-muted">
                        월 단위로 입력해주세요.
                    </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 적금가능 최저금액</Form.Label>
                    <Form.Control 
                        required 
                        type="number" 
                        name="smin" 
                        value={smin} 
                        onChange={onChange} 
                        placeholder="만원" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 적금가능 최고금액</Form.Label>
                    <Form.Control 
                        required 
                        type="number" 
                        name="smax" 
                        value={smax} 
                        onChange={onChange} 
                        placeholder="만원" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 적금이자</Form.Label>
                    <Form.Control 
                        required 
                        type="number" 
                        name="srate" 
                        value={srate} 
                        onChange={onChange} 
                        placeholder="%" />
                    <Form.Text className="text-muted">
                        소수점 둘째자리까지만 입력해주세요.
                    </Form.Text>
                    </Form.Group>

                    <Stack direction="horizontal" gap={2} className="col-md-2 mx-auto">
                    <Button variant="success" onClick={savePdsaving}>Register</Button>
                    <Button variant="outline-secondary" type="reset">Cancel</Button>
                    </Stack>
                </Form>
            </Container>
            <br/><br/>
        </div>  
    );
}

export default SavingComponentAdd;