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
    },[])

    const handleSearchChange = (newSearch) => {
        setSearch(newSearch);
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
    };

    return (
        <Container>
            <h3>공지사항</h3>
            <hr/>
            <SearchBar value={Search} onSearchChange={handleSearchChange} />
            <br/>
            <Table align='center'>
            
            <tbody align='center'>
                <tr>
                    <th>No.</th>
                    <th>제목</th>
                    <th>등록일자</th>
                    <td>조회수</td>
                </tr>
                {ListMember.filter(item => 
                            item.ncontent.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, '')) || 
                            item.ntitle.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, ''))
                        ).map((notice) => {
                    if(notice.nshow == 'N'){
                        return;
                    }else {
                    return (
                <tr key={notice.nnum}>
                    <td>{notice.nnum}</td>
                    <td><a onClick={() => move(notice.nnum)}>{notice.ntitle}</a></td>
                    <td>{new Date(notice.nregDate).toISOString().slice(0,10)}</td>
                    <td>{notice.ncount}</td>
                </tr>
                 )}})}
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