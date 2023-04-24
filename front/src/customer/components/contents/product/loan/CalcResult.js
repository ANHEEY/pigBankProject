import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

const CalcResult = () => {

    return(
        <>
           <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>월평균 상환원금</th>
                    <th>월평균 이자금액</th>
                    <th>월평균 내는 금액</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                </tbody>
            </Table> 
        </>
    )
}
export default CalcResult;