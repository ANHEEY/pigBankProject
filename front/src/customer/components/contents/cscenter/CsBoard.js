// 공지사항
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import NoticeApiService from "../../../../admin/components/contents/csCenter/NoticeApiService";
import ReactPaginate from "react-paginate";
import SearchBar from "./SearchBar";

function CsBoard () {

    const [List, setList] = useState([]);
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);
    const countlist = List.length;

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
        console.log(nnum);
        navigate(`/customer/cscenter/cs_board_detail/${nnum}`);
    }

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
                {List.filter(item => 
                            item.ncontent.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, '')) || 
                            item.ntitle.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, ''))
                        ).slice(pageNumber * 10, (pageNumber + 1) * 10).map((notice) => {
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
                  <ReactPaginate
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    pageCount={countlist / 10}  // 전체 페이지 수
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </tbody>
            </Table>
               
        </Container>
    )
}
export default CsBoard;