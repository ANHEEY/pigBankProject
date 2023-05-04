// 대출계좌조회
import React, { useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../All/AllService";
import {Link} from 'react-router-dom';
import "../../../../resources/css/product/saving.css";
import { Button, Stack } from 'react-bootstrap'; // npm install react-bootstrap bootstrap


function Loan() {

    const [members, setMembers] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        reloadMemberList();
    }, []);
  
    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링

    const reloadMemberList = () => {
        AllService.fetchLoan()
          .then(res => {
            setMembers(res.data);
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
    
      const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
        return acNum;
      }
    
      const filteredMembers = members.filter(
        (member) => member.lpdName.indexOf(selectedOption) !== -1
      );
    
      const tableHeadStyle={
        fontWeight: "bold",
      }
          
    return (
    <main className="main">
        <section className="section">
            
        </section>
        
        <section className="section">
        <div className="container">
            <h2>대출계좌조회</h2>                

                <p className="thead1">
                <select value={selectedOption} onChange={handleChange}>
                    <option value="">전체선택</option>
                    {members.map((member) => (
                    <option key={member.lpdName} value={member.lpdName}>{member.lpdName}</option>
                    ))}
                </select>    
                </p>  
                                    
            <div class="card text-center">
                
                <div class="card-header" style={{backgroundColor:"#dbe2d872" }}>
                    <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a class="nav-link disabled" href="/customer/account/Loan">대출계좌</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/customer/account/Saving" ><Link to="/customer/account/Saving">적금계좌</Link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/customer/account/Deposit"><Link to="/customer/account/Deposit">예금계좌</Link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/customer/account/LoanState"><Link to="/customer/account/LoanState">대출심사결과조회</Link></a>
                    </li>
                    </ul>
                </div>
            </div>

            <div class="card-body">
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell style={tableHeadStyle}>계좌명</TableCell>
                        <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                        <TableCell style={tableHeadStyle}>가입기간</TableCell>
                        <TableCell style={tableHeadStyle}>용도</TableCell>
                        <TableCell style={tableHeadStyle}>한도</TableCell>
                        <TableCell style={tableHeadStyle}>상환잔액</TableCell>
                        <TableCell style={tableHeadStyle}>업무</TableCell>
                    </TableRow>
                    </TableHead>
                    {filteredMembers.map((member) => (
                    <TableBody key={member.lreqNum}>
                        <TableRow >
                        <TableCell style={{color:"purple"}}>{member.lpdName}</TableCell>
                        <TableCell>{acNum(member.acNumber)}</TableCell>
                        <TableCell>{member.lperiod}</TableCell>
                        <TableCell>{member.lpurpose}</TableCell>
                        <TableCell>{(member.lincome)}</TableCell>
                        <TableCell>{formatCurrency(member.lprincipal)}</TableCell>
                        <TableCell>
                            <Stack gap={2} className="col-md-8">
                            <Button variant="outline-secondary"><Link to="/LoanSchedule" style={{color:"black"}}>상환스케쥴</Link></Button>
                            <Button variant="outline-secondary" type="button">상환내역</Button>
                            </Stack>
                        </TableCell>
                        </TableRow>
                    </TableBody>
                    ))}
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