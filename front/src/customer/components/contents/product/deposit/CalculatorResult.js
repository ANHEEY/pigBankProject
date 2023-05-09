//예금 계산기 계산하는곳
import { Table } from 'react-bootstrap';

function CalculatorResult({props}){

    const style = {
        color: "green",
        fontWeight: "bold",
    }

    let amount=props.amount*10000;
    let period=props.period;
    let rate=props.rate;

    let expRate = Math.round((rate/100)*amount*(period/12));
    let afterTaxRate = Math.round(expRate*0.846);
    let expAmount = (amount+expRate);
    let aterTaxAmount = (amount+afterTaxRate);

    // 콤마 찍기
    const comma = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return(
        <>
            <p>
            <span style={style}>{comma(amount/10000)}</span>만원을 <span style={style}>{period}</span>개월 동안 <span style={style}>{rate}</span>%의 예금 상품에 저축하면
                이자 <span style={style}>{comma(expRate)}</span>원을 더해 총 <span style={style}>{comma(expAmount)}</span>원을 모으실 수 있습니다. 
            </p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th style={{textAlign:'center'}}>구분</th>
                    <th style={{textAlign:'center'}}>만기금액</th>
                    <th style={{textAlign:'center'}}>이자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>비과세</td>
                    <td>{comma(expAmount)}원</td>
                    <td>{comma(expRate)}원</td>
                    </tr>
                    <tr>
                    <td>일반과세(세후)</td>
                    <td>{comma(aterTaxAmount)}원</td>
                    <td>{comma(afterTaxRate)}원</td>
                    </tr>
                </tbody>
            </Table> 
            <p>* 일반과세의 경우 이자금액의 15.4%가 원천징수되고 비과세 종합저축의 경우 이자소득세가 면제됩니다.</p>
            <p>* 비과세종합저축은 가입대상자에 한해 5천만원 한도로 적용됩니다.</p>
            <p>* 관련세법에 따른 세율변경 시 변경된 세율이 적용됩니다.</p>
            <p>* 본 계산결과는 만기 및 이자금액 계산을 위한 단순 예시로 각 상품별 세제혜택 내용에 따라 달라질 수 있습니다.</p>
        </>
    );
}

export default CalculatorResult;