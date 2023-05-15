import React, { useEffect, useState } from "react";
import {Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset} from "@fortawesome/free-solid-svg-icons";
import NoticeApiService from "./NoticeApiService";
import { useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import SearchBar from "../../../../customer/components/contents/cscenter/SearchBar";
import Pagination from "@mui/material/Pagination";

// npm install react-paginate  => 페이징 처리

function NoticeComponent () {


    const [List, setList] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [Search, setSearch] = useState('');

    useEffect(() => {
        fetchnoticeList();
        const searchParams = new URLSearchParams(window.location.search);
        const page = searchParams.get('page');
        const search = decodeURIComponent(searchParams.get('search') || '');

        setCurrentPage(Number(page) || 1);
        setSearch(search);
    },[])

    const handleSearchChange = (newSearch) => {
        setSearch(newSearch);
         const searchResultIndex = List.findIndex((item) => // 검색했을때의 값의 해당하는 인덱스 번호 찾기
          item.nshow === 'y' &&
           (item.ncontent.toLowerCase().includes(newSearch.toLowerCase().replace(/\s/g, '')) ||
          item.ntitle.toLowerCase().includes(newSearch.toLowerCase().replace(/\s/g, '')))
         );
         if (searchResultIndex !== -1) {
           const pageNumber = Math.ceil((searchResultIndex + 1) / itemsPerPage);
           setCurrentPage(pageNumber);
           navigate(`/admin/csCenter/notice?page=${pageNumber}&search=${encodeURIComponent(newSearch)}`);
        } else {
           return;
         }
      };

    const fetchnoticeList = () => {
        NoticeApiService.noticeList()
            .then(res => {
                console.log(res.data);
                setList(res.data);
            })
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const ListMember = List.slice(indexOfFirstItem, indexOfLastItem);
   
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/admin/csCenter/notice?page=${pageNumber}&search=${encodeURIComponent(Search)}`);
    };

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
                <Table striped style={{width:"1000px"}}>
                    <thead>
                        <tr align="center">
                            <th>#</th>
                            <th>공지사항 제목</th>
                            <th>공지사항 내용</th>
                            <th>공지사항 등록날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ListMember
                    .filter(item =>
                        Search === null || Search === '' ||
                        item.ncontent.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, '')) ||
                        item.ntitle.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, ''))
                    ).map((notice) => (
                        <tr key={notice.nnum}>
                            <td><a onClick={() => move(notice.nnum)} key={notice.nnum}>상태:{notice.nshow} {notice.nnum} </a></td>
                            <td><a onClick={() => move(notice.nnum)} key={notice.nnum}>{notice.ntitle.slice(0,15) + '...'}</a></td>
                            <td><a onClick={() => move(notice.nnum)} key={notice.nnum}>{notice.ncontent.slice(0,15) + '...'}</a></td>
                            <td><a onClick={() => move(notice.nnum)} key={notice.nnum}>{new Date(notice.nregDate).toISOString().slice(0,10)}</a></td>
                        </tr>
                        ))}

                        <tr>
                            <td colSpan={4} style={{textAlign:"center"}}>
                                <Box display="flex" justifyContent="center">
                                    <Pagination 
                                    count={Math.ceil(List.length / itemsPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    />
                                </Box>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div> 
        )
    }
export default NoticeComponent;