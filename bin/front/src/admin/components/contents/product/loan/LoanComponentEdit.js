import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { TextField, Typography} from "@mui/material";


class LoanComponentEdit extends Component{
    render(){
        return(
            <div className="component-div" align="center" >
            <Typography variant='h4' align="center" style={style}>대출상품수정</Typography>
            <TextField 
                required
                id="standard-required"
                variant="standard"
                label="꿀꿀대출 :"
                placeholder="Input your l_pdName"
            /><br/>

            <TextField 
                required
                id="standard-required"
                variant="standard"
                label="#돼지은행대표상품 :"
                placeholder="Input your l_content"
            /><br/>

            <TextField 
                required
                id="standard-required"
                variant="standard"
                label="조건없음 :"
                placeholder="Input your l_grade"
            /><br/>

            <TextField 
                required
                id="standard-required"
                variant="standard"
                label="5년 :"
                placeholder="Input your l_maxPeriod"
            /><br/>

            <TextField 
                required
                id="standard-required"
                variant="standard"
                label="5,000,000 :"
                placeholder="Input your l_max"
            /><br/>

            <TextField 
                required
                id="standard-required"
                variant="standard"
                label="3.04 :"
                placeholder="Input your l_type"
            /><br/>

            <TextField 
                required
                id="standard-required"
                variant="standard"
                label="만기상환 :"
                placeholder="Input your l_type"
            /><br/>

            <TextField 
                required
                id="standard-required"
                variant="standard"
                label="11% :"
                placeholder="Input your l_cxlRate"
            /><br/>

            <button color="light"><Link to="">수정완료</Link></button>
            SELECT * FROM loan_product WHERE l_pdName='';
        </div>      
        )
    }
   
}
const style =  {
    display: 'flex',
    justifyContent: 'center'
}
export default LoanComponentEdit;