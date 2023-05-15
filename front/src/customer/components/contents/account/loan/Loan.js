// 대출계좌조회
import React, { useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../All/AllService";
import {Link, useNavigate} from 'react-router-dom';
import "../../../../resources/css/product/saving.css";
import { Button, Stack } from 'react-bootstrap'; // npm install react-bootstrap bootstrap

function Loan() {

    // 업무 버튼 css
    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center'
    };

    const [members, setMembers] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    
    // useNavigate 
    const navigate = useNavigate();

    useEffect(() => {
        reloadMemberList(window.localStorage.getItem("id"));
    }, []);
  
    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링
    const reloadMemberList = (id) => {
        AllService.fetchLoan(id)
          .then(res => {
            setMembers(res.data);
            console.log(res.data);
          })
          .catch(err => {
            console.log('reloadMemberList() Error!!',err);
          });
    }
      
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
      }
    
    const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
        });

        return formatter.format(value);
    }

    // const filteredMembers = members.filter(
    //     (member) => member.lreqNum.indexOf(selectedOption) !== -1
    // );

    const tableHeadStyle={
        fontWeight: "bold",
    }

    // 상세페이지 이동
    const handleGoDetailButton = (acNumber) => {
        const id = window.localStorage.getItem("id");
        navigate(`/customer/account/loan/LoanDetail/${acNumber}/${id}`);
    };

    // CSY_계좌번호 - 추가 처리
    const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
        return acNum;
    }

    //csy_상환스케쥴로 이동
    const goPaySchedule = (lnum) => {
        navigate(`/customer/account/loan/LoanSchedule/${lnum}`);
    }

    //csy_중도해지 화면으로 이동
    const goCancel = (lnum) => {
        navigate(`/customer/account/loan/LoanCancel/${lnum}`);
    }

    
      
    return (
    <main className="main">
        <section className="section">
            
        </section>
        
        <section className="section">
        <div className="container">
            <div className="title_div">
              <div className="title_see">
              대출계좌 조회
              </div>
            </div>
            <div className="card text-center">
                
                <div className="card-header" style={{backgroundColor:"#dbe2d872" }}>
                    <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="/customer/account/Account">입출금계좌</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/customer/account/Deposit">예금계좌</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/customer/account/Saving">적금계좌</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="/customer/account/Loan">대출계좌</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/customer/account/LoanState">대출심사결과조회</a>
                    </li>
                    </ul>
                </div>
            </div>

            <div className="card-body">
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell style={tableHeadStyle}>계좌명</TableCell>
                        <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                        <TableCell style={tableHeadStyle}>가입기간</TableCell>
                        <TableCell style={tableHeadStyle}>가입일</TableCell>
                        <TableCell style={tableHeadStyle}>만기일</TableCell>
                        <TableCell style={tableHeadStyle}>상환잔액</TableCell>
                        <TableCell style={{...tableHeadStyle, textAlign: "center"}}>업무</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {members.map((member) => (
                        <TableRow key={member.acNumber}>
                        <TableCell onClick={() => handleGoDetailButton(member.acNumber)}>
                            {member.lpdName}
                        </TableCell>
                        <TableCell>{acNum(member.acNumber)}</TableCell>
                        <TableCell>{member.lperiod}년</TableCell>
                        <TableCell>{new Date(member.lstartDate).toLocaleDateString().slice(0,-1)}</TableCell>
                        <TableCell>{new Date(member.lendDate).toLocaleDateString().slice(0,-1)}</TableCell>
                        {/*CSY_대출잔액이 0인 경우 대출중도상환완료로 노출 */}
                        <TableCell>{member.acBalance === 0 ? "대출상환완료" : formatCurrency(member.acBalance)}</TableCell>
                        <TableCell>
                            {/*CSY_업무 버튼 추가*/}
                            <Stack direction="horizontal" gap={2} className="col-md-12 mx-auto" style={buttonStyle}>
                                <Button variant="success" onClick={() => {goPaySchedule(member.lnum)}} disabled={member.acBalance === 0}>상환스케쥴</Button>
                                <Button variant="outline-secondary" onClick={() => {goCancel(member.lnum)}} disabled={member.acBalance === 0}>중도해지</Button>                          
                            </Stack> 
                        </TableCell>
                        </TableRow>
                   ))}
                   </TableBody>
                </Table>
            </div>
        </div> 
        </section>
        <br />
        <br />
        <br />
        </main>
    );
}

export default Loan;