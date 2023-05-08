import React, { useEffect, useState } from "react";
import {Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset} from "@fortawesome/free-solid-svg-icons";
import NoticeApiService from "./NoticeApiService";
import { useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchBar from "../../../../customer/components/contents/cscenter/SearchBar";

// npm install react-paginate  => 페이징 처리

function NoticeComponent () {
    const [List, setList] = useState([]);
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);
    const listcount = List.length;

    const [Search, setSearch] = useState('');

    useEffect(() => {
        fetchnoticeList();
    },[])

    const handleSearchChange = (newSearch) => {
        setSearch(newSearch);
    };

    const handlePageClick = (data) => {
        const { selected } = data;
        setPageNumber(selected);
      };

    const fetchnoticeList = () => {
        NoticeApiService.noticeList()
            .then(res => {
                console.log(res.data);
                setList(res.data);
            })
    }

    function move (nnum) {
        navigate(`detail/${nnum}`);
    }

    function add() {
        navigate('add');
    }
        return(
            <div className="component-div">
                <h1><FontAwesomeIcon icon={faHeadset}/> 공지사항 목록</h1>
                <hr></hr>
                <SearchBar value={Search} onSearchChange={handleSearchChange} />
                <br/>
                <br/>
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
                        {List.filter(item => 
                            item.ncontent.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, '')) || 
                            item.ntitle.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, ''))
                        ).slice(pageNumber * 10, (pageNumber + 1) * 10).map((notice) => (
                        <tr key={notice.nnum}>
                            <td><a onClick={() => move(notice.nnum)} key={notice.nnum}>상태:{notice.nshow} {notice.nnum} </a></td>
                            <td><a onClick={() => move(notice.nnum)} key={notice.nnum}>{notice.ntitle.slice(0,15) + '...'}</a></td>
                            <td><a onClick={() => move(notice.nnum)} key={notice.nnum}>{notice.ncontent.slice(0,15) + '...'}</a></td>
                            <td><a onClick={() => move(notice.nnum)} key={notice.nnum}>{new Date(notice.nregDate).toISOString().slice(0,10)}</a></td>
                        </tr>
                        ))}
                            <ReactPaginate
                                previousLabel={"이전"}
                                nextLabel={"다음"}
                                pageCount={listcount / 10}  // 전체 페이지 수
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={10}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                activeClassName={"active"}
                            />
                    </tbody>
                </Table>
            </div> 
        )
    }
export default NoticeComponent;