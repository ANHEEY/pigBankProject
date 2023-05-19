import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Box } from "@mui/material";
import AllService from "../../../../customer/components/contents/account/All/AllService";
import axios from "axios";
import { getAuthToken } from "../../../../customer/components/helpers/axios_helper";
import Pagination from "@mui/material/Pagination";
import SearchBar from "../../../../customer/components/contents/cscenter/SearchBar";
import { useNavigate } from "react-router-dom";
import NoticeApiService from "../csCenter/NoticeApiService";

function AccountComponent() {

  const [combinedMembers, setCombinedMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  // 검색한 값
  const [Search, setSearch] = useState('');

  const [totalpage, setTotalPage] = useState();

  useEffect(() => {
    if (getAuthToken() !== null) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
    } else {
      axios.defaults.headers.common['Authorization'] = ``;
    }
    reloadMemberList();

    const searchParams = new URLSearchParams(window.location.search);
    const page = searchParams.get('page');
    const search = decodeURIComponent(searchParams.get('search') || '');

    setCurrentPage(Number(page) || 1);
    setSearch(search);
    setCurrentPage(1);
  }, []);

  const reloadMemberList = () => {
    Promise.all([
      AllService.fetchAdminAccount(),
      AllService.fetchAdminSaving(),
      AllService.fetchAdminDeposit(),
      AllService.fetchAdminLoan()
    ])
      .then((responses) => {
        const [accountData, savingData, depositData, loanData] = responses;
        const members = [
          ...accountData.data,
          ...savingData.data,
          ...depositData.data,
          ...loanData.data,
        ];

        const pagenum = Math.ceil(members.length / itemsPerPage);
        setCombinedMembers(members);
        setTotalPage(pagenum);
        setLoading(false);
      })
      .catch((err) => {
        console.log("reloadMemberList() Error!!", err);
      });
  };


  const formatCurrency = (value) => {
    if (isNaN(value)) {
      return "₩0";
    }

    if (value === 0) {
      return "₩0";
    }

    const formatter = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    });

    return formatter.format(value);
  };

  const formatDate = (dateStr) => {
    if (isNaN(dateStr)) {
      return "null";
    }

    const date = new Date(dateStr);
    date.setTime(date.getTime() + (9 * 60 * 60 * 1000));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const acNum = (acNumber) => {
    const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
    return acNum;
  };

  const tableHeadStyle = {
    fontWeight: "bold",
  };

  const handleSort = (column) => {
    let sortedItems = [...combinedMembers];

    if (sortColumn === column) {
      sortedItems.reverse();
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      sortedItems.sort((a, b) => {
        const valueA = parseFloat(a[column] || a.acBalance || a.samount || a.damount || a.lprincipal || 0);
        const valueB = parseFloat(b[column] || b.acBalance || b.samount || b.damount || b.lprincipal || 0);

        if (column === "잔액") {
          if (sortOrder === "asc") {
            return valueA - valueB;
          } else {
            return valueB - valueA;
          }
        } else {
          return 0; // 다른 열은 정렬하지 않음
        }
      });
      setSortColumn(column);
      setSortOrder("asc");
    }

    setCombinedMembers(sortedItems);
  };

  const handleSortColumnClick = (column) => {
    handleSort(column.toLowerCase());
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);

    if (newSearch === "") {
      reloadMemberList();
      setCurrentPage(1);
      navigate(`/admin/acSearch/acAccount?page=1&search=`);
    } else {
      const searchKeywords = newSearch.toLowerCase().split(/\s+/);
      const searchResultIndex = combinedMembers.filter((item) => {
        const acType = String(item.acType);
        const id = String(item.id) && item.id.toString();
        const spdname = String(item.spdname);
        const dpdName = String(item.dpdName);
        const lpdName = String(item.lpdName);
        const acnumber = String(item.acNumber);

        return searchKeywords.every((keyword) =>
          acType.toLowerCase().includes(keyword) ||
          id.toLowerCase().includes(keyword) ||
          spdname.toLowerCase().includes(keyword) ||
          dpdName.toLowerCase().includes(keyword) ||
          lpdName.toLowerCase().includes(keyword) ||
          acnumber.toLowerCase().includes(keyword)
        );
      });
      console.log(searchResultIndex);
      const pageNumber = Math.ceil(searchResultIndex.length / itemsPerPage)
      setTotalPage(pageNumber)
      setSearchResult(searchResultIndex);

    }
  };

  let displayMembers = Search ? searchResult : combinedMembers;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  displayMembers = displayMembers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/admin/acSearch/acAccount?page=${pageNumber}&search=${encodeURIComponent(Search)}`);
  };

  return (
    <div className="component-div">
      <h1><FontAwesomeIcon icon={faSearch} /> 계좌목록 </h1>
      <ul>
        <SearchBar value={Search} onSearchChange={handleSearchChange} />
        <br />
        <br />
        <p>은행명과 계좌명,계좌번호(-를 제외한)로 조회하세요.</p>
      </ul>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (

        <Table>
          <TableHead style={{ backgroundColor: "#dbe2d872" }}>
            <TableRow>
              <TableCell style={tableHeadStyle}>가입자</TableCell>
              <TableCell style={tableHeadStyle}>계좌명</TableCell>
              <TableCell style={tableHeadStyle}>계좌번호</TableCell>
              <TableCell style={tableHeadStyle}>가입날짜</TableCell>
              <TableCell style={tableHeadStyle}>만기날짜</TableCell>
              <TableCell style={tableHeadStyle}>상태</TableCell>
              <TableCell onClick={() => handleSortColumnClick("잔액")} style={{ cursor: "pointer" }}>
                잔액
                <span>
                  {sortColumn === "잔액" ? (
                    sortOrder === "desc" ? (
                      "▲"
                    ) : (
                      "▼"
                    )
                  ) : (
                    "▼"
                  )}
                </span>
              </TableCell>
            </TableRow>
          </TableHead>


          <TableBody>
            {displayMembers
              .map((member, index) => {
                return (
                  <TableRow key={`member${index}`}>
                    <TableCell>{member.id}</TableCell>
                    <TableCell>{member.acType || member.spdname || member.dpdName || member.lpdName}</TableCell>
                    <TableCell>{acNum(member.acNumber)}</TableCell>
                    <TableCell>{formatDate(member.newDate || member.sendDate || member.djoinDate || member.lreqDate)}</TableCell>
                    <TableCell>{formatDate(member.lastDate || member.sjoinDate || member.dendDate || member.lendDate)}</TableCell>
                    <TableCell>{member.acState}</TableCell>
                    <TableCell>{formatCurrency(member.acBalance || member.samount || member.damount || member.lprincipal)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>

          <TableFooter>
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
          </TableFooter>

        </Table>
      )}
    </div>
  )

}
export default AccountComponent;