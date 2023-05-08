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

    //csy_상환스케쥴로 이동
    const goPaySchedule = (lnum) => {
        navigate(`/customer/account/loan/LoanSchedule/${lnum}`);
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
                                    
            <div className="card text-center">
                
                <div className="card-header" style={{backgroundColor:"#dbe2d872" }}>
                    <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a className="nav-link disabled" href="/customer/account/Loan">대출계좌</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/customer/account/Saving" ><Link to="/customer/account/Saving">적금계좌</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/customer/account/Deposit"><Link to="/customer/account/Deposit">예금계좌</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/customer/account/LoanState"><Link to="/customer/account/LoanState">대출심사결과조회</Link></a>
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
                        <TableCell style={tableHeadStyle}>용도</TableCell>
                        <TableCell style={tableHeadStyle}>한도</TableCell>
                        <TableCell style={tableHeadStyle}>상환잔액</TableCell>
                        <TableCell style={{...tableHeadStyle, textAlign: "center"}}>업무</TableCell>
                    </TableRow>
                    </TableHead>
                    {filteredMembers.map((member) => (
                    <TableBody key={member.lnum}>
                        <TableRow >
                        <TableCell style={{color:"purple"}}>{member.lpdName}</TableCell>
                        <TableCell>{acNum(member.acNumber)}</TableCell>
                        <TableCell>{member.lperiod}</TableCell>
                        <TableCell>{member.lpurpose}</TableCell>
                        <TableCell>{(member.lincome)}</TableCell>
                        <TableCell>{formatCurrency(member.lprincipal)}</TableCell>
                        <TableCell>
                            <Stack direction="horizontal" gap={2} className="col-md-12 mx-auto" style={buttonStyle}>
                            <Link to={`/customer/account/loan/LoanSchedule/${member.lnum}`}> 
                                <Button variant="outline-secondary" onClick={() => {goPaySchedule(member.lnum)}}>상환스케쥴</Button>
                            </Link>
                            <Link to={`/customer/account/loan/LoanSchedule/${member.lnum}`}>
                                <Button variant="outline-secondary" type="button">중도해지</Button>
                            </Link>                           
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