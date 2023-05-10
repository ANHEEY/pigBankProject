  // 환율계산기
  import React, { useEffect, useState } from 'react';
  import AllService from '../account/All/AllService';
  import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
  

  function ExchangeRateCal3() {
    const [exchangeRates, setExchangeRates] = useState([]);
    const [selectedExchangeRate, setSelectedExchangeRate] = useState(null);
    const [amount, setAmount] = useState(0);
    const [result, setResult] = useState(null);
  
    useEffect(() => {
      AllService.fetchExchangeList()
        .then(res => {
          const exchangeRates = res.data;
          const usdExchangeRate = exchangeRates.find(rate => rate.name === '(USD)');
  
          setExchangeRates(exchangeRates);
          setSelectedExchangeRate(usdExchangeRate);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    const handleExchangeRateChange = event => {
      const selectedExchangeRate = exchangeRates.find(rate => rate.name === event.target.value);
      setSelectedExchangeRate(selectedExchangeRate);
    };
  
    const handleAmountChange = event => {
      const amount = parseFloat(event.target.value.replace(/[^\d.-]/g, ''));
      setAmount(amount);
    };
  
    const handleCalculate = event => {
      event.preventDefault();
      let result;
  
      if (selectedExchangeRate?.name === '(JPY)') {
        result = amount * (selectedExchangeRate?.sell / 100);
      } else if (selectedExchangeRate?.name === '(USD)') {
        result = amount * selectedExchangeRate?.sell;
      } else if (selectedExchangeRate?.name === '(EUR)') {
        result = amount * selectedExchangeRate?.sell;
      } else if (selectedExchangeRate?.name === '(CNY)') {
        result = amount * selectedExchangeRate?.sell;
      }
  
      setResult(result);
    };
  
    const formatCurrency = value => {
      const formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      });
      return formatter.format(value);
    };
  
    const exchangeStyleTable = {
      textAlign: 'center'
    };
  
    return (
      <div className='container'>
       
        <div className='container' style={{ width: '100%' }}>
          <Table style={exchangeStyleTable}>
            <TableHead >
              <TableRow>
                <TableCell>
                  환율:
                  <select value={selectedExchangeRate?.name} onChange={handleExchangeRateChange}>
                    <option value='(USD)'>USD</option>
                    <option value='(CNY)'>CNY</option>
                    <option value='(EUR)'>EUR</option>
                    <option value='(JPY)'>JPY</option>
                  </select>
                </TableCell>

                <TableCell style={{textAlign:"center"}}>
                 환율:{selectedExchangeRate?.sell}{selectedExchangeRate?.name}
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>

            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                    
                      금액:
                </TableCell>
                <TableCell>
                      <input
                      type="text"
                      value={(amount) + ' ' + selectedExchangeRate?.name}
                      onChange={handleAmountChange}
                    />
                </TableCell>
                <TableCell><button onClick={handleCalculate}>계산</button></TableCell>    
              </TableRow>

              <TableRow>
                
                <TableCell colSpan={3} style={{textAlign:"center" , fontWeight:"bold"}}>
                  {result !== null && (
                    <span>
                      결과: {formatCurrency(result.toFixed(2))}{" "}원
                      <button>환전신청</button>
                    </span>
                  )}
              </TableCell> 
              </TableRow>
            </TableBody>
          
            </Table>
          </div>
        </div>
         
      );
    
  }
  export default ExchangeRateCal3;