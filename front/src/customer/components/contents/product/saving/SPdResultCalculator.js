import { Table } from 'react-bootstrap';

function SPdResultCalculator({props}){

    const style = {
        color: "green",
        fontWeight: "bold",
    }

    let amount=props.amount*10000;
    let period=props.period; // 기간
    let rate=props.rate;     // 금리

    let expRate = (rate/100)*amount*(period/12);
    let expAmount = (amount+expRate);

    // 콤마 찍기
    const comma = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return(
        <>
            <p>
            <span style={style}>{comma(amount/10000)}</span>만원을 <span style={style}>{period}</span>개월 동안 <span style={style}>{rate}</span>%의 적금 상품에 저축하면
                이자 <span style={style}>{comma(expRate)}</span>원을 더해 총 <span style={style}>{comma(expAmount)}</span>원을 모으실 수 있습니다. 
            </p>
            <Table striped bordered hover>
                <thead style={{textAlign:"center"}}>
                    <tr>
                    <th>예치금액</th>
                    <th>만기금액</th>
                    <th>금리</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{comma(amount)}원</td>
                    <td>{comma(expAmount)}원</td>
                    <td>{comma(expRate)}원</td>
                    </tr>
                </tbody>
            </Table> 
        </>
    );
}

export default SPdResultCalculator;