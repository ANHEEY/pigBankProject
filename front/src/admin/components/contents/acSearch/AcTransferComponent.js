import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../../../../customer/components/contents/account/All/AllService";
import SearchBar from "../../../../customer/components/contents/cscenter/SearchBar";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "./ReactDatePicker";

function AcTransferComponent() {
    // objecttype 모든 이체내역
    const [members1, setMembers1] = useState([]);
    const navigate = useNavigate();
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // 검색한 값
    const [Search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [totalpage, setTotalPage] = useState();
    const [daybyData, setDaybyData] = useState([]);

    const [filteredMembers, setFilteredMembers] = useState([]);

    const today = new Date(); // 현재 날짜
    const year = today.getFullYear(); // 현재 연도
    const month = today.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1 필요)
    const day = today.getDate(); // 현재 일

    // 날짜를 원하는 형식으로 표현할 경우
    const todayDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    const [selectedDate, setSelectedDate] = useState(todayDate);

    // 화면에 뿌려줄 date 값으로 변환해주는 함수
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        reloadMemberList();
        const searchParams = new URLSearchParams(window.location.search);
        const page = searchParams.get('page');
        const search = decodeURIComponent(searchParams.get('search') || '');

        setCurrentPage(Number(page) || 1);
        setSearch(search);
    }, []);

    // onDateChange 자식 컴포넌트 ReactDatePicker 에서 호출됨 선택한 값이 다시 set 되서 자식컴포넌트로 전달
    const handleDateChange = (date) => {
        const formattedDate = formatDate(date); // 선택한 날짜를 형식에 맞게 변환
        console.log(formattedDate);
        setSelectedDate(formattedDate); // 선택한 날짜 업데이트

        console.log(members1);
        // 선택한 날짜에 해당하는 값들 가져오기
        const searchResults = members1.filter((item) => {
            const formattedItemDate = formatDate(item.tdate);
            return formattedItemDate === formattedDate;
        })

        console.log(searchResults);

        if (searchResults.length > 0) {
            const pageNumber = Math.ceil(searchResults.length / itemsPerPage);
            console.log(pageNumber);
            setDaybyData(searchResults);
            setTotalPage(pageNumber);
            setCurrentPage(1); // 선택한 날짜에 해당하는 페이지로 이동하기 위해 currentPage를 1로 설정
            navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
        } else {
            setDaybyData([]);
            setTotalPage(0);
            setCurrentPage(1);
            navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
        }
    };

    const reloadMemberList = () => {
        AllService.fetchTransfer()
            .then((res) => {
                setMembers1(res.data);
                const pagenum = Math.ceil(res.data.length / itemsPerPage);
                setTotalPage(pagenum)

                const formattedDate = formatDate(todayDate); // 선택한 날짜를 형식에 맞게 변환
                const searchResults = res.data.filter((item) => {
                    const formattedItemDate = formatDate(item.tdate);
                    return formattedItemDate === formattedDate;
                })

                if (searchResults.length > 0) {
                    const pageNumber = Math.ceil(searchResults.length / itemsPerPage);
                    console.log(pageNumber);
                    setDaybyData(searchResults);
                    setTotalPage(pageNumber);
                    setCurrentPage(1); // 선택한 날짜에 해당하는 페이지로 이동하기 위해 currentPage를 1로 설정
                    navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
                } else {
                    setDaybyData([]);
                    setTotalPage(0);
                    setCurrentPage(1);
                    navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
                }
            })
            .catch((err) => {
                console.log("reloadMemberList() Error!!", err);
            });
    };

    // 검색한값 setSearch에 담기
    const handleSearchChange = (newSearch) => {
        setSearch(newSearch);

        if (newSearch === "") {
            setSearchResult([]);
            // 검색어가 비어있는 경우 전체 값을 다시 불러옴
            handleDateChange(selectedDate);
        } else {
            console.log(daybyData);
            const searchResults = daybyData.filter((item) => { // 검색한값과 전체 데이터에서 비교한후 searchResults에 담기
                const acNumber = item.acNumber && item.acNumber.toString();
                const bank = item.tdepositBank && item.tdepositBank.toString()
                const acType = item.acType && item.acType.toString();
                console.log(bank);
                return (
                    acNumber.includes(newSearch.toLowerCase().replace(/\s/g, '')) ||
                    bank.toLowerCase().includes(newSearch.toLowerCase().replace(/\s/g, '')) ||
                    acType.toLowerCase().includes(newSearch.toLowerCase().replace(/\s/g, '')) ||
                    formatDate(item.tdate).toLowerCase().includes(newSearch.toLowerCase().replace(/\s/g, ''))
                );
            });
            console.log(searchResults);

            if (searchResults.length > 0) { // 검색결과의 값의 index가 0보다 크면
                const pageNumber = Math.ceil(searchResults.length / itemsPerPage); // 검색결과의 길이 / 10
                setSearchResult(searchResults); // 검색결과를 members1변수에 담기
                setTotalPage(pageNumber); // 전체페이지
                setCurrentPage(1); // 검색 시 첫 페이지로 이동
                navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(newSearch)}`);
            } else {
                setSearchResult([]); // 검색결과에 따른 값이 없으면 값 초기화 해주기
                setTotalPage(0); // 전체페이지도 초기화
                setCurrentPage(1); // 검색 결과가 없으면 첫 페이지로 이동
                navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(newSearch)}`);
            }
        }

        if (newSearch === "" && selectedDate !== todayDate) { // 겁색값이 비어있고 선택한 날짜가 오늘날짜가 아니면
            handleDateChange(selectedDate); // 선택한 날짜로 handleDateChange 함수를탐
        }
    };

    let displayMembers = Search ? searchResult : daybyData;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    displayMembers = displayMembers.slice(indexOfFirstItem, indexOfLastItem);

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


    // 계좌번호 3번째에다가 - 추가해주는 함수
    const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
        return acNum;
    };

    const tableHeadStyle = {
        fontWeight: "bold",
    };

    const withdraw = () => {

        setSearchResult([]);
        const searchResults = members1
            .filter((item) => item.ttype === "출금")
            .filter((item) => {
            const formattedItemDate = formatDate(item.tdate);
            return formattedItemDate === selectedDate;
        })
        if (searchResults.length > 0) {
            const pageNumber = Math.ceil(searchResults.length / itemsPerPage);
            setDaybyData(searchResults);
            setTotalPage(pageNumber);
            setCurrentPage(1); // 선택한 날짜에 해당하는 페이지로 이동하기 위해 currentPage를 1로 설정
            navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
        } else {
            setDaybyData([]);
            setTotalPage(0);
            setCurrentPage(1);
            navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
        }
        
    };

    const transfer = () => {
        setSearchResult([]);
        const searchResults = members1
            .filter((item) => {
            const formattedItemDate = formatDate(item.tdate);
            return formattedItemDate === selectedDate;
        })
        if (searchResults.length > 0) {
            const pageNumber = Math.ceil(searchResults.length / itemsPerPage);
            setDaybyData(searchResults);
            setTotalPage(pageNumber);
            setCurrentPage(1); // 선택한 날짜에 해당하는 페이지로 이동하기 위해 currentPage를 1로 설정
            navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
        } else {
            setDaybyData([]);
            setTotalPage(0);
            setCurrentPage(1);
            navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
        }
    }
    const deposited = () => {
        setSearchResult([]);
        const searchResults = members1
            .filter((item) => item.ttype === "입금")
            .filter((item) => {
            const formattedItemDate = formatDate(item.tdate);
            return formattedItemDate === selectedDate;
        })
        if (searchResults.length > 0) {
            const pageNumber = Math.ceil(searchResults.length / itemsPerPage);
            setDaybyData(searchResults);
            setTotalPage(pageNumber);
            setCurrentPage(1); // 선택한 날짜에 해당하는 페이지로 이동하기 위해 currentPage를 1로 설정
            navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
        } else {
            setDaybyData([]);
            setTotalPage(0);
            setCurrentPage(1);
            navigate(`/admin/acSearch/acTransfer?page=1&search=${encodeURIComponent(Search)}`);
        }
    }
    return (
        <div className="component-div">
            <h1>
                <FontAwesomeIcon icon={faSearch} /> 입출금내역
            </h1>

            <ul>
                <hr />
                <li><SearchBar value={Search} onSearchChange={handleSearchChange} /></li>
                <br />
                <li><p>은행명과 계좌명,계좌번호(-를 제외한)로 조회하세요.</p></li>
                <br />
                <li><ReactDatePicker selectedDate={selectedDate} onDateChange={handleDateChange} /></li>
            </ul>
            <div>
                <button onClick={deposited} className="btnbtn small"> 입금 내역 </button>
                {' '}&nbsp;
                <button onClick={withdraw} className="btnbtnopen small"> 출금 내역 </button>
                {' '}&nbsp;
                <button onClick={transfer} className="btnbtnfind small">입출금 내역</button>
            </div>
            <br />
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
                    {displayMembers
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
                        <TableCell colSpan={7} style={{ textAlign: "center" }}>
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