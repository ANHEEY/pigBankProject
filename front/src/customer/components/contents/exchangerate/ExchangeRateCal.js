  // 환율계산기
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExchangeRateCal2 from './ExchangeRateCal2';
import ExchangeRateCal3 from './ExchangerRateCal3';


  function ExchangeRateCal() {
  const tableStyle={
   
  }
  
    return (
      <div className='container'>
       <h1><FontAwesomeIcon icon={faSearch}/>환율계산기</h1>
        <div className='card' style={{ width: '100%' ,textAlign:"center" }}>
          
          <Table style={tableStyle}>
            <TableHead>
              <TableRow>
                <TableCell style={{backgroundColor: '#dbe2d872', margin: "15px",  textAlign: "center"}}>
                  <h4 style={{textAlign:"center" }}>현찰 살 때</h4>

                </TableCell>
                <TableCell style={{backgroundColor: '#dbe2d872', margin: "15px",  textAlign: "center"}}>
                  <h4 style={{textAlign:"center"}}>현찰 팔 때</h4>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell style={{borderRight:"1px solid lightgrey"}}>
                  <ExchangeRateCal2 />
                </TableCell>

                <TableCell >
                  <ExchangeRateCal3 />
                </TableCell>
              </TableRow>
            </TableBody>
            </Table>
          </div>
         

          

        </div>
         
      );
    
  }
  export default ExchangeRateCal;