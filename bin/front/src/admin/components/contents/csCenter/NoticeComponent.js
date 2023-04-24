import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class NoticeComponent extends Component{
    render(){
        return(
            <div>
                <h1><FontAwesomeIcon icon={faHeadset}/> 공지사항 목록</h1>
                <Link to = "detail">이곳을 클릭하면 공지사항 상세페이지로 이동합니다.</Link>
                <br/>
                <Link to = "add">이곳을 클릭하면 공지사항 등록페이지로 이동합니다.</Link>
                <ul>
                    <li>1. 공지사항 목록 출력</li>
                    <li>2. 등록 버튼 틀릭시 등록 페이지 이동 </li>
                    <li>3. 작성 버튼 클릭 시 상세페이지로 이동</li>
                    <li>4. 목록 클릭 시 상세페이지 이동</li>
                </ul>
                <Table striped>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
                SELECT * FROM notice_tbl; --공지사항 리스트 전체
            </div>            
        )
    }
}
export default NoticeComponent;