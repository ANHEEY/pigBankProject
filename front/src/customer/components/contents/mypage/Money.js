// 자산관리
import React, { useEffect,useState } from "react";
import {Chart} from 'react-google-charts';
import CustomerService from "../../common/CustomerService";
import { Container } from "react-bootstrap";


function Money () {
    const [data,setData]=useState([]);
    const [data2,setData2]=useState([]);

    useEffect(()=>{
        CustomerService.assetsManagement(window.localStorage.getItem("id"))
            .then(res=>{
                console.log(res.data);
                const formattedData = formatChartData(res.data);
                const formattedData2 = formatChartData2(res.data);
                console.log("formattedData : "+formattedData);
                console.log("formattedData2 : "+formattedData2);
                setData(formattedData);
                setData2(formattedData2);
            })
            .catch(err=>{
                console.log('assetsManagement() error!!!',err);
            });
    },[]);

    //데이터 포맷 가공
    const formatChartData = (originalData)=>{
        const formattedData = [['계좌 타입','금액',{role:'style'}]];//컬럼 헤더
        console.log('originalData : '+originalData);
        // 데이터 행 추가

        const parsedData = JSON.parse(originalData.replace(/'/g, '"'));
        const mappedData = parsedData.map(item => [item[0], item[1], '#2E8B57']);
        formattedData.push(...mappedData);

        console.log("formattedData : "+formattedData);
        return formattedData;
    };

    const formatChartData2 = (originalData)=>{
        const formattedData2 = [['계좌 타입','금액']];//컬럼 헤더
        console.log('originalData : '+originalData);
        // 데이터 행 추가

        const parsedData = JSON.parse(originalData.replace(/'/g, '"'));
        const mappedData = parsedData.map(item => [String(item[0]), item[1]]);
        formattedData2.push(...mappedData);

        console.log("formattedData2 : "+formattedData2);
        return formattedData2;
    };


    //데이터가 로딩 중인 경우에 대한 처리
    if(data.length === 0){
        return <div><h1>Loading...</h1></div>;
    }
    
    //데이터가 로드된 후에 차트를 렌더링
    //차트 옵션 설정
    const options={
        title:'나의 자산 현황',
        vAxis:{title:'계좌 종류'},
        hAxis:{title:'금액', minValue:0, maxValue:5000000},
        bars:'horizontal',
        legend:'none',
    };

    const options2={
        title:'나의 자산 현황',
        //legend: 'none',
        vAxis:{title:'계좌 종류'},
        hAxis:{title:'금액', minValue:0, maxValue:5000000},
        bars:'horizontal',
        annotations: {
            textStyle: {
              color: 'black', // 텍스트 색상
              fontSize: 12, // 텍스트 크기
            },
        },
    };

 

    return (
        <Container>
            <h2><span style={{color:"green",fontWeight:"bold"}}>{window.localStorage.getItem("id")}</span>님의 자산 현황</h2>
            <Chart
            chartType="BarChart"
            data={data}
            options={options}
            width="100%"
            height="600px"
            legendToggle
            />

            <Chart
            chartType="PieChart"
            data={data2}
            options={options2}
            width="100%"
            height="600px"
            legendToggle
            />
        </Container>
    );
}

export default Money;