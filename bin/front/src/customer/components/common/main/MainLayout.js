import React from 'react';
import { Carousel } from 'react-bootstrap';

import MainBoard from "../main/MainBoard";
import piggy_bank from "../../../resources/img/main1.jpg"
import bank_img from '../../../resources/img/main3.jpg';
import pig from '../../../resources/img/pig_bank.jpeg'
import '../../../resources/css/style.css'

// MainCarousels 삭제 후 MainLayout 안에 캐주얼 + 보드 합침
function MainLayout() {
    return (
        <div className='carousel' >
            <br/><br/>
            <Carousel style={{ width: '75%', height: '600px'}}>
                <Carousel.Item>
                    <img className="d-block w-100 h-280" 
                        src={pig} alt="First slide" 
                        style={{ width: 'auto', height: '600px' }}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100 h-280" 
                        src={bank_img} alt="Second slide"
                        style={{ width: 'auto', height: '600px' }}
                    />
                </Carousel.Item>
            </Carousel>
            <br/><br/>
            <MainBoard/>
            <br/><br/>
      </div>
    )
}
export default MainLayout;
