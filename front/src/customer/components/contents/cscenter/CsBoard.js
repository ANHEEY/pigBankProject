// 공지사항
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import NoticeApiService from "../../../../admin/components/contents/csCenter/NoticeApiService";
import Pagination from "@mui/material/Pagination";
import SearchBar from "./SearchBar";

function CsBoard () {

    const [List, setList] = useState([]);
    const navigate = useNavigate();
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
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
           navigate(`/customer/cscenter/cs_board?page=${pageNumber}&search=${encodeURIComponent(newSearch)}`);
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
    function move (nnum) {
        console.log(nnum);
        navigate(`/customer/cscenter/cs_board_detail/${nnum}`);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const ListMember = List.slice(indexOfFirstItem, indexOfLastItem);
   
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/customer/cscenter/cs_board?page=${pageNumber}&search=${encodeURIComponent(Search)}`);
    };

    return (
        <Container>
            <h3>공지사항</h3>
            <hr/>
            <SearchBar value={Search} onSearchChange={handleSearchChange} /><p>제목 또는 내용으로 검색</p>
            <br/>
            <Table align='center'>
            
            <tbody align='center'>
                <tr>
                    <th>No.</th>
                    <th>제목</th>
                    <th>등록일자</th>
                    <td>조회수</td>
                </tr>
                {ListMember
                    .filter(item =>
                        item.nshow === 'y' &&
                        (Search === null || Search === '' ||
                        item.ncontent.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, '')) ||
                        item.ntitle.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, ''))
                        )
                    )
                    .map(notice => (
                        <tr key={notice.nnum}>
                        <td>{notice.nnum}</td>
                        <td><a onClick={() => move(notice.nnum)}>{notice.ntitle}</a></td>
                        <td>{new Date(notice.nregDate).toISOString().slice(0, 10)}</td>
                        <td>{notice.ncount}</td>
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
               
        </Container>
    )
}
export default CsBoard;