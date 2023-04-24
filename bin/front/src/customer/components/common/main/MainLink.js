import React from 'react';
import { Box, Link } from '@mui/material';
import '../../resources/css/mainCarousels.css';


function MainLink () {
    return (
        <div className="center_product_area">
          <div className='center_middle_inner'>
            <Box component="span" sx={{ p: 7, backgroundColor: '#E9EFE', '&:hover': { backgroundColor: '#CFE0C2', opacity: [0.9, 0.8, 0.7],}}}>
                <Link clssName="link-color" to="" underline="none">예금</Link>
                <span></span>
            </Box>
            <Box component="span" sx={{ p: 7, backgroundColor: '#E9EFE', '&:hover': { backgroundColor: '#CFE0C2', opacity: [0.9, 0.8, 0.7],}}}>
                <Link to="" underline="none">적금</Link>
                <br/><span></span>
            </Box>
            <Box component="span" sx={{ p: 7, backgroundColor: '#E9EFE', '&:hover': { backgroundColor: '#CFE0C2', opacity: [0.9, 0.8, 0.7],}}}>
                <Link to="" underline="none" >환율</Link>
                <br/><span></span>
            </Box>
            <Box component="span" sx={{ p: 7, backgroundColor: '#E9EFE', '&:hover': { backgroundColor: '#CFE0C2', opacity: [0.9, 0.8, 0.7],}}}>
                <Link to="" underline="none" >펀드</Link>
                <br/><span></span>
            </Box>
            <Box component="span" sx={{ p: 7, backgroundColor: '#E9EFE', '&:hover': { backgroundColor: '#CFE0C2', opacity: [0.9, 0.8, 0.7],}}}>
                <Link to="" underline="none" >대출</Link>
                <br/><span></span>
            </Box>
          </div>      
        </div>
    )
}
export default MainLink;