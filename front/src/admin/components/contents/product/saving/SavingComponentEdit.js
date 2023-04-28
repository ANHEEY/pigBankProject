import React, { useEffect, useState } from "react";
import { Container, Button, Form, Stack } from 'react-bootstrap';
import { IoIosAddCircleOutline } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../resources/css/savingProduct/add_sPd.css';
import SavingApiService from "./SavingApiService";


// 미완
function SavingComponentEdit () {

    // const [spdupdate, setSPdUpdate] = useState({
    //     spdname: "",
    //     scontent: "",
    //     speriod: "",
    //     smin: "",
    //     smax: "",
    //     srate: "",
    //     scxlrate: "",
    //     sregdate: ""
    // });

    // useEffect(() => {
    //     SavingApiService.updateSaving(window.localStorage.getItem("spdname"))
    //     .then(res => {
    //         let pdSaving = res.date;
    //         setSPdUpdate({
    //             spdname: pdSaving.spdname,
    //             scontent: pdSaving.scontent,
    //             speriod: pdSaving.speriod,
    //             smin: pdSaving.smin,
    //             smax: pdSaving.smax,
    //             srate: pdSaving.srate,
    //             scxlrate: pdSaving.scxlrate,
    //             sregdate: pdSaving.sregdate
    //         })
    //     })
    //     .catch(err =>{
    //         console.log('updateSaving Error!', err);
    //     });
    // }, []);

    // const [selBySPd, setSelBySPd] = useState([]);

    // const updateSPd = (e) => {
    //     setSelBySPd(e.target.value)
    // }

    const [spdupdate, setSPdUpdate] = useState({
        spdname: "",
        scontent: "",
        speriod: "",
        smin: "",
        smax: "",
        srate: "",
        scxlrate: "",
        sregdate: ""
      });
    
      useEffect(() => {
        SavingApiService.updateSaving(window.localStorage.getItem("spdname"))
          .then(res => {
            let pdSaving = res.data;
            setSPdUpdate({
              spdname: pdSaving.spdname,
              scontent: pdSaving.scontent,
              speriod: pdSaving.speriod,
              smin: pdSaving.smin,
              smax: pdSaving.smax,
              srate: pdSaving.srate,
              scxlrate: pdSaving.scxlrate,
              sregdate: pdSaving.sregdate
            })
          })
          .catch(err => {
            console.log('updateSaving Error!', err);
          });
      }, []);
    
      const [selBySPd, setSelBySPd] = useState([]);
    
      const updateSPd = (e) => {
        setSelBySPd(e.target.value)
      }
    
      const onChange = (e) => {
        setSPdUpdate({
          ...spdupdate,
          [e.target.name]: e.target.value
        })
      }
    
      const savePdsaving = (e) => {
        e.preventDefault();
        let pdSaving = {
          spdname: spdupdate.spdname,
          scontent: spdupdate.scontent,
          speriod: spdupdate.speriod,
          smin: spdupdate.smin,
          smax: spdupdate.smax,
          srate: spdupdate.srate,
          scxlrate: spdupdate.scxlrate,
          sregdate: spdupdate.sregdate
        };
    
        SavingApiService.editSaving(pdSaving)
          .then(res => {
            window.localStorage.removeItem("spdname");
            window.alert('수정되었습니다.');
            window.location.href = '/admin/spdlist';
          })
          .catch(err => {
            console.log('editSaving Error!', err);
          });
      }
    
      const { spdname, scontent, speriod, smin, smax, srate, scxlrate, sregdate } = spdupdate;
    

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
    )
}
export default SavingComponentEdit;