import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import NoticeApiService from "./NoticeApiService";
import { Button, Container, Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { FormControlLabel } from "@mui/material";

function NoticeDetailComponent () {

    const {nnum} = useParams();
    const [ntitle, setNtitle] = useState([]);
    const [ncontent, setNcontent] = useState([]);
    const [nregDate, setNregDate] = useState([]);
    const [nshow, setNShow] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        checkoneNotice(nnum);
    },[])

    const checkoneNotice = (nnum) => {
        NoticeApiService.checkoneNotice(nnum)
            .then(res => {
               setNtitle(res.data.ntitle);
               setNcontent(res.data.ncontent);
               setNregDate(new Date(res.data.nregDate).toISOString().slice(0,10))
               setNShow(res.data.nshow);
               console.log(res.data);
            })
    }

    const nshowchange = () => {
        if(nshow === 'Y'){
            setNShow('N');
        }
        else{
            setNShow('Y');
        }
    }

    const change = () => {

        let changeval = {
            nnum: nnum,
            ntitle: ntitle,
            ncontent: ncontent,
            nshow: nshow
        }

        console.log("changeval : " , changeval);
        NoticeApiService.changeshow(changeval)
            .then(res => {
                alert('성공');
                navigate('/admin/csCenter/notice')
            })
    }

    const noticedelete = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            NoticeApiService.noticedelete(nnum)
              .then(res => {
                alert("공지사항이 삭제되었습니다.");
                navigate("/admin/csCenter/notice");
              });
          } else {
            alert("취소되었습니다.");
          }
    }

    return( 
        <div className="component-div" >
            <div style={{ width: "1200px" }}>
                <Container>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th ><Form.Control value={ntitle} onChange={(e) => setNtitle(e.target.value)}>
                                </Form.Control></th>
                            <td>상태 - {nshow}</td>
                            <td><Button variant="success" onClick={nshowchange}>변경</Button></td>
                            <td>{nregDate}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th style={{ width: "50px" }}>내용</th>
                            <td colspan={4} style={{ width: "500px" }}>
                                <Form.Control value={ncontent} as="textarea"
                                onChange={(e) => setNcontent(e.target.value)}></Form.Control></td>
                        </tr>
                    </tbody>
                    </Table>
                    <div align="right">
                    <Button variant="success" onClick={change}>변경</Button>{' '}
                    <Button variant="danger" onClick={noticedelete}>게시글삭제</Button>
                    </div>
                </Container>
                </div>
        </div>
    );
    }
export default NoticeDetailComponent;