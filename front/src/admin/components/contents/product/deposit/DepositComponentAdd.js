import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { TextField, Typography} from "@mui/material";
class DepositComponentAdd extends Component{
    render(){
        return(
            <div align="center" >
                <Typography variant='h4' align="center" style={style}>예금상품등록</Typography>
                <TextField 
                 required
                 id="standard-required"
                 variant="standard"
                 label="상품이름 :"
                 placeholder="Input your d_pdName"
                /><br/>
                <TextField 
                 required
                 id="standard-required"
                 variant="standard"
                 label="가입기간 :"
                 placeholder="Input your d_period"
                /><br/>
                <TextField 
                 required
                 id="standard-required"
                 variant="standard"
                 label="상품금리 :"
                 placeholder="Input your d_rate"
                /><br/>
                <TextField 
                 required
                 id="standard-required"
                 variant="standard"
                 label="상품설명 :"
                 placeholder="Input your d_content"
                /><br/>
                <TextField 
                 required
                 id="standard-required"
                 variant="standard"
                 label="예금최소금액 :"
                 placeholder="Input your d_min"
                /><br/>
                <TextField 
                 required
                 id="standard-required"
                 variant="standard"
                 label="예금최대금액 :"
                 placeholder="Input your d_max"
                /><br/>
                <TextField 
                 required
                 id="standard-required"
                 variant="standard"
                 label="중도해지시금리 :"
                 placeholder="Input your d_cxlRate"
                /><br/>
                <button color="light"><Link to="add">상품등록</Link></button>

            </div>
                    
        )
    }
}
const style =  {
    display: 'flex',
    justifyContent: 'center'
}

export default DepositComponentAdd;