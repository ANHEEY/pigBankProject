import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { TextField, Typography} from "@mui/material";


class SavingComponentEdit extends Component{
    render(){
        return(
            <div align="center" >
            <Typography variant='h4' align="center" style={style}>적금상품수정</Typography>
            <TextField 
             required
             id="standard-required"
             variant="standard"
             label="든든한적금 "
             placeholder="Input your s_pdName"
            /><br/>
            <TextField 
             required
             id="standard-required"
             variant="standard"
             label="1년만기 "
             placeholder="Input your s_period"
            /><br/>
            <TextField 
             required
             id="standard-required"
             variant="standard"
             label="3.05% "
             placeholder="Input your s_rate"
            /><br/>
            <TextField 
             required
             id="standard-required"
             variant="standard"
             label="든든한적금 "
             placeholder="Input your s_content"
            /><br/>
            <TextField 
             required
             id="standard-required"
             variant="standard"
             label="1,000,000 "
             placeholder="Input your s_min"
            /><br/>
            <TextField 
             required
             id="standard-required"
             variant="standard"
             label="0.02% "
             placeholder="Input your s_max"
            /><br/>
            <TextField 
             required
             id="standard-required"
             variant="standard"
             label="0.02% "
             placeholder="Input your s_cxlRate"
            /><br/>
            <button color="light"><Link to="">수정완료</Link></button>
            SELECT * FROM savings_product where s_pdName = ''; 
        </div>      
        )
    }
   
}
const style =  {
    display: 'flex',
    justifyContent: 'center'
}
export default SavingComponentEdit;