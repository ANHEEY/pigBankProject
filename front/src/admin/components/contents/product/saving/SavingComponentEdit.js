import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {TextField} from '@mui/material';
import {Button, Stack } from 'react-bootstrap';
import '../../../../resources/css/savingProduct/add_sPd.css';


class SavingComponentEdit extends Component{
    
    // constructor(props) {
    //     super(props);

    //     this,state = {

    //     }
    // }

    render(){
        return(
            <div className="component-div">
            <div className="admin-title">
                상품수정
            </div>
            <div className="sPd-detailTable"><br/><br/>
                <table clssName="sPd-detailTable-info" style={{width: 900}}>
                    <thead className="sPd-detailTable-title">
                        <tr><th colSpan={2}>Product</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th style={{width: '30%'}}>상품명</th>
                            <td style={{width: '70%', textAlign: 'center'}}>하나의 여행적금</td>
                        </tr>
                        <tr>
                            <th>상품설명</th>
                            <td>
                                <TextField
                                    required
                                    id="outlined-textarea"
                                    type="text"
                                    name="sContent"
                                    placeholder="상품설명을 입력하세요."
                                    value={this.state.sContent}
                                    onChange={this.onChange}
                                    multiline
                                    style={{width: 700}}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>가입기간</th>
                            <td>
                                <TextField
                                    required
                                    id="outlined-textarea"
                                    type="text"
                                    name="sPeriod"
                                    placeholder="월 단위로 입력하세요."
                                    value={this.state.sPeriod}
                                    onChange={this.onChange}
                                    multiline
                                    style={{width: 700}}
                                />  
                            </td>
                        </tr>
                        <tr>
                            <th>적금가입 최소금액</th>
                            <td>
                                <TextField
                                    required
                                    id="outlined-textarea"
                                    type="text"
                                    name="sMin"
                                    placeholder="원 단위로 입력하세요."
                                    value={this.state.sMin}
                                    onChange={this.onChange}
                                    multiline
                                    style={{width: 700}}
                                    />  
                            </td>
                        </tr>
                        <tr>
                            <th>적금가입 최대금액</th>
                            <td>
                                <TextField
                                    required
                                    id="outlined-textarea"
                                    type="text"
                                    name="sMax"
                                    placeholder="원 단위로 입력하세요."
                                    value={this.state.sMax}
                                    onChange={this.onChange}
                                    multiline
                                    style={{width: 700}}
                                    />  
                            </td>
                        </tr>
                        <tr>
                            <th>적용금리</th>
                            <td>
                                <TextField
                                    required
                                    id="outlined-textarea"
                                    type="text"
                                    name="sRate"
                                    placeholder="적용금리를 입력하세요."
                                    value={this.state.sRate}
                                    onChange={this.onChange}
                                    multiline
                                    style={{width: 700}}
                                    />  
                            </td>
                        </tr>
                        <tr>
                            <th>중도해지시금리</th>
                            <td>
                                <TextField
                                    required
                                    id="outlined-textarea"
                                    type="text"
                                    name="sCxlRate"
                                    placeholder="중도해지시 금리를 입력하세요."
                                    value={this.state.sCxlRate}
                                    onChange={this.onChange}
                                    multiline
                                    style={{width: 700}}
                                    />  
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><br/><br/>
            <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
            <Button variant="success" type="submit" size="medium">수정</Button>
            <Button variant="outline-secondary" type="reset" size="medium"><Link to="">취소</Link></Button>
            </Stack><br/><br/><br/> 
        </div>  
        )
    }

}
export default SavingComponentEdit;