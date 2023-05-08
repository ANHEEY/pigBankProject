import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import NoticeApiService from "./NoticeApiService";
import {useNavigate} from "react-router-dom";


function NoticeAddComponent () {
    const [ntitle, setNtitle] = useState([]);
    const [ncontent, setNcontent] = useState([]);

    const navigate = useNavigate();

    const add = () => {
        let notice = {
            ntitle: ntitle,
            ncontent: ncontent
        }
        NoticeApiService.noticeadd(notice)
            .then(res => {
                alert('등록완료 !');
                navigate('/admin/csCenter/notice');
            })
    }
        return(
            <div className="component-div">
                <h1> 공지사항 등록 폼 </h1>
                <div style={{ width: "1200px" }}>
                <Container>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th ><Form.Label>제목</Form.Label>
                                <Form.Control value={ntitle} onChange={(e) => setNtitle(e.target.value)}>
                                </Form.Control></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th style={{ width: "50px" }}>내용</th>
                            <td colspan={3} style={{ width: "500px" }}>
                                <Form.Control value={ncontent} as="textarea"
                                onChange={(e) => setNcontent(e.target.value)}></Form.Control></td>
                        </tr>
                    </tbody>
                    </Table>
                    <div align="right">
                    <Button variant="success" onClick={add}>게시글추가</Button>{' '}
                    <a href="/admin/csCenter/notice"><Button variant="danger">이전</Button></a>
                    </div>
                </Container>
                </div>
            </div>
        )
    }
export default NoticeAddComponent;