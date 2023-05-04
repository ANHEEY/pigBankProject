import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import NoticeApiService from "./NoticeApiService";
import { useNavigate, useParams } from "react-router-dom";

function NoticeComponent () {
    let number = 1;
    const [List, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchnoticeList();
    },[])

    const fetchnoticeList = () => {
        NoticeApiService.noticeList()
            .then(res => {
                console.log(res.data);
                setList(res.data);
            })
    }

    function move (nnum) {
        console.log(nnum);
        navigate(`detail/${nnum}`);
    }

    function add() {
        navigate('add');
    }
        return(
            <div className="component-div">
                <h1><FontAwesomeIcon icon={faHeadset}/> 공지사항 목록</h1>
                <Link to = "detail">이곳을 클릭하면 공지사항 상세페이지로 이동합니다.</Link>
                <Link to = "add">이곳을 클릭하면 공지사항 등록페이지로 이동합니다.</Link>
                <ul>
                    <li>1. 공지사항 목록 출력</li>
                    <li>2. 등록 버튼 틀릭시 등록 페이지 이동 </li>
                    <li>3. 제목 클릭 시 상세페이지로 이동</li>
                    <li>4. 목록 클릭 시 상세페이지 이동</li>
                </ul>
                <div >
                 <Button variant="primary" onClick={add} style={{ textAlign: 'left' }}>
                    공지사항 등록</Button>
                </div>
                <Table striped>
                    <thead>
                        <tr align="center">
                            <th>#</th>
                            <th>공지사항 제목</th>
                            <th>공지사항 내용</th>
                            <th>공지사항 등록날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {List.map((notice) => (
                        <tr key={notice.nnum}>
                            <td>{notice.nnum}</td>
                            <td><a onClick={() => move(notice.nnum)} key={notice.nnum}>{notice.ntitle}</a></td>
                            <td>{notice.ncontent.slice(0,10) + '...'}</td>
                            <td>{new Date(notice.nregDate).toISOString().slice(0,10)}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div> 
        )
    }
export default NoticeComponent;