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
            <h1><FontAwesomeIcon icon={faSearch}/> 환율정보 </h1>
            <ul>
                
            </ul>
            <div className="container" >
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
                                <TableCell style={tableCellStyle}>{member.exDate}</TableCell> 
                            </TableRow>
                        ))}
                    
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={8} style={buttonStyle}><Button onClick={reloadMemberList} >환율조회</Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                
            </div>
        </div>            
    )
    
}
export default ExchangeRate;