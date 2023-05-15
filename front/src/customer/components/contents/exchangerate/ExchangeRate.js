import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import AllService from "../../../../customer/components/contents/account/All/AllService";

function ExchangeRate (){
    const [members1, setMembers1] = useState([]);
    const [members2, setMembers2] = useState([]);
  
    useEffect(() => {
      reloadMemberList();
    }, []);
  
    const reloadMemberList = () => {
      AllService.fetchExchangeUpdate()
        .then((res) => {
          setMembers1(res.data);
        })
        .catch((err) => {
          console.log("reloadMemberList() Error!!", err);
        });
  
      AllService.fetchExchangeList()
        .then((res) => {
          setMembers2(res.data);
        })
        .catch((err) => {
          console.log("reloadMemberList() Error!!", err);
        });
    };
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = (date.getHours() + 9).toString().padStart(2, '0'); // 한국 시간 추가
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const tableHeadStyle = {
      fontWeight: "bold",
      textAlign: "center",
    };
    const tableCellStyle = {
      textAlign: "center",
    };
  
    const buttonStyle = {
      textAlign: "center",
      width: "20%",
    };


    return(
        <div className="container" >
            <div className="title_div">
                <div className="title_see">
                  <FontAwesomeIcon icon={faSearch}/> 환율정보
                </div>
            </div>
            <div className="container" style={{padding:"5px", margin:"5px"}} >
                <Table >
                    <TableHead style={{backgroundColor:"#dbe2d872"}}>
                        <TableRow >
                            <TableCell style={tableHeadStyle}>번호</TableCell>
                            <TableCell style={tableHeadStyle}>나라</TableCell>
                            <TableCell style={tableHeadStyle}>환율</TableCell>
                            <TableCell style={tableHeadStyle}>현찰 살 때</TableCell>
                            <TableCell style={tableHeadStyle}>현찰 팔 때</TableCell>
                            <TableCell style={tableHeadStyle}>송금 보낼 때</TableCell>
                            <TableCell style={tableHeadStyle}>송금 받을 때</TableCell>
                            <TableCell style={tableHeadStyle}>마지막 업데이트</TableCell>
                            
                            
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {members2.map((member) => (
                            <TableRow key={member.exNo}>
                                <TableCell style={tableCellStyle}>{member.exNo}</TableCell>
                                <TableCell style={tableCellStyle}>{member.name}</TableCell>
                                <TableCell style={tableCellStyle}>{member.price}</TableCell>
                                <TableCell style={tableCellStyle}>{member.buy}</TableCell>
                                <TableCell style={tableCellStyle}>{member.sell}</TableCell>
                                <TableCell style={tableCellStyle}>{member.send}</TableCell>
                                <TableCell style={tableCellStyle}>{member.receive}</TableCell>
                                <TableCell style={tableCellStyle}>{formatDate(member.exDate)}</TableCell> 
                            </TableRow>
                        ))}
                    
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={8} style={buttonStyle}><Button onClick={reloadMemberList} >환율조회</Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                
            </div>
        </div>            
    )
    
}
export default ExchangeRate;