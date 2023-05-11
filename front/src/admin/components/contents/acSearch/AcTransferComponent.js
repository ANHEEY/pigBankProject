import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../../../../customer/components/contents/account/All/AllService";
import SearchBar from "../../../../customer/components/contents/cscenter/SearchBar";
import {Box} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import ReactDatePicker from "./ReactDatePicker";

function AcTransferComponent() {
    // objecttype 모든 이체내역
    const [members1, setMembers1] = useState([]);
    const navigate = useNavigate();
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // 검색한 값
    const [Search, setSearch] = useState('');
   
    const [totalpage,setTotalPage] = useState('');
    

    useEffect(() => {
        reloadMemberList();
        const searchParams = new URLSearchParams(window.location.search);
        const page = searchParams.get('page');
        const search = decodeURIComponent(searchParams.get('search') || '');

        setCurrentPage(Number(page) || 1);
        setSearch(search);
        
    }, []);

    const today = new Date(); // 현재 날짜
    const year = today.getFullYear(); // 현재 연도
    const month = today.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1 필요)
    const day = today.getDate(); // 현재 일

    // 날짜를 원하는 형식으로 표현할 경우
    const todayDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    const [selectedDate, setSelectedDate] = useState(todayDate);

    
    
    // onDateChange 자식 컴포넌트 ReactDatePicker 에서 호출됨 선택한 값이 다시 set 되서 자식컴포넌트로 전달
    const handleDateChange = (date) => {
        const formattedDate = formatDate(date); // 선택한 날짜를 형식에 맞게 변환
        setSelectedDate(formattedDate); // 선택한 날짜 업데이트
      
        // 선택한 날짜에 해당하는 값들 가져오기
        AllService.fetchTransfer().then((res) => {
          const searchResults = res.data.filter((item) => {
            const formattedItemDate = formatDate(item.tdate);
            return formattedItemDate === formattedDate;
          });
      
          if (searchResults.length > 0) {
            const pageNumber = Math.ceil(searchResults.length / itemsPerPage);
            
            setMembers1(searchResults);
            setTotalPage(pageNumber);
            navigate(`/admin/acSearch/acTransfer?page=${currentPage}&search=${encodeURIComponent(Search)}`);
          } else {
            setMembers1([]);
            setTotalPage(0);
            navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
          }
        });
      };

    const reloadMemberList = () => {
        AllService.fetchTransfer()
        .then((res) => {
            setMembers1(res.data);

            const pagenum = Math.ceil(res.data.length / itemsPerPage);
            setTotalPage(pagenum)
        })
        .catch((err) => {
            console.log("reloadMemberList() Error!!", err);
        });
    };

    const handleSearchChange = (newSearch) => {
        setSearch(newSearch);
         const searchResultIndex = members1.findIndex((item) => // 검색했을때의 값의 해당하는 인덱스 번호 찾기
          item.nshow === 'y' &&
           (item.ncontent.toLowerCase().includes(newSearch.toLowerCase().replace(/\s/g, '')) ||
          item.ntitle.toLowerCase().includes(newSearch.toLowerCase().replace(/\s/g, '')))
         );
         if (searchResultIndex !== -1) {
           const pageNumber = Math.ceil((searchResultIndex + 1) / itemsPerPage);
           setCurrentPage(pageNumber);
           navigate(`/admin/acSearch/acTransfer?page=${pageNumber}&search=${encodeURIComponent(newSearch)}`);
        } else {
           return;
         }
      };

    // 전체이체내역 조회기 때문에 필터링 X 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const ListMember = members1.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 이동 누를때마다 해당하는 페이지 넘버 를 setCurrentPage 담기
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/admin/acSearch/acTransfer?page=${pageNumber}&search=${encodeURIComponent(Search)}`);
    };

    // 숫자 KRW(원) 으로 변경
    const formatCurrency = (value) => {
        const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
        });
        return formatter.format(value);
    };

    // 화면에 뿌려줄 date 값으로 변환해주는 함수
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // 계좌번호 3번째에다가 - 추가해주는 함수
    const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
        return acNum;
    };

    const tableHeadStyle = {
        fontWeight: "bold",
    };

    // 컴포넌트 이동 함수(출금내역)
    const withdraw = () => {
        navigate(`/admin/acSearch/acWithdraw`)
    }
    // 컴포넌트 이동 함수(입금내역)
    const deposited = () => {
        navigate(`/admin/acSearch/acDeposit`)
    }
        return(
            <div className="component-div">
                <h1>
                <FontAwesomeIcon icon={faSearch} /> 입출금내역
                </h1>

                <ul>
                <hr />
                <li><SearchBar value={Search} onSearchChange={handleSearchChange}/></li>
                <br />
                <li><p>은행명과 계좌번호(-를 제외한)로 조회하세요.</p></li>
                <br/>
                <li><ReactDatePicker selectedDate={selectedDate} onDateChange={handleDateChange}/></li>
                </ul>
                <div>
                    <Button onClick={deposited} variant="success"> 입금 내역 </Button>
                    {' '}
                    <Button onClick={withdraw} variant="info"> 출금 내역 </Button>
                </div>
                <Table>
                <TableHead style={{ backgroundColor: "#dbe2d872" }}>
                    <TableRow>
                    <TableCell style={tableHeadStyle}>은행명</TableCell>
                    <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                    <TableCell style={tableHeadStyle}>입출금</TableCell>
                    <TableCell style={tableHeadStyle}>금액</TableCell>
                    <TableCell style={tableHeadStyle}>mymemo</TableCell>
                    <TableCell style={tableHeadStyle}>yourmemo</TableCell>
                    <TableCell style={tableHeadStyle}>날짜</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                {ListMember
                    .filter(item => { // 검색조건 계좌번호 은행명 날짜를 대소문자, 띄어쓰기 상관없이 검색
                        const acNumber = item.acNumber && item.acNumber.toString();
                        return acNumber.includes(Search.toLowerCase().replace(/\s/g, '')) || 
                        item.tdepositBank.toLowerCase().includes(Search.toLowerCase().replace(/\s/g, '')) ||
                        formatDate(item.tdate).toLowerCase().includes(Search.toLowerCase().replace(/\s/g, ''))
                    })
                    .filter(member => {
                        const formattedDate = formatDate(member.tdate); // member.tdate를 형식에 맞게 변환
                        return formattedDate === selectedDate; // 선택한 날짜와 일치하는지 확인
                    })
                    .map((member) => (
                        <TableRow key={member.tnum}>
                        <TableCell style={{ color: "navy" }}>{member.tdepositBank}</TableCell>
                        <TableCell>{member.acType} | {acNum(member.acNumber)}</TableCell>
                        <TableCell>{member.ttype}</TableCell>
                        <TableCell>{formatCurrency(member.tamount)}</TableCell>
                        <TableCell>{member.myMemo}</TableCell>
                        <TableCell>{member.yourMemo}</TableCell>
                        <TableCell>{formatDate(member.tdate)}</TableCell>
                        </TableRow>
                    ))}


                    <TableRow>
                        <TableCell colSpan={7} style={{textAlign:"center"}}>
                            <Box display="flex" justifyContent="center">
                                <Pagination 
                                count={totalpage}
                                page={currentPage}
                                onChange={handlePageChange}
                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </div>
    );
};

export default AcTransferComponent;