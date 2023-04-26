// 원리금 상환 계산기 : 대출 원금과 이자의 합계를 매월 균등하게 나누어서 상환하는 방식 
import { Table } from 'react-bootstrap';

const style = {
    color: "green",
    fontWeight: "bold",
}

const WonriGuemCalc= ({ props }) => {
    let amount = props.amount * 10000; // 대출원금 (만원) 
    let month = props.period * 12; // 대출기간 (년)
    let rate = props.rate;   // 대출금리

    let m = rate * 0.01 / 12;  // 월이자율 
    let rm = Math.pow(1+m, month) // (1+m)의 개월수 거듭제곱
    let bunja = amount * m * rm;
    let bunmo = rm - 1

    let lMonTotal = Math.round(bunja/bunmo) // 매월 상환액 반올림 (원금 + 이자)
    let lMonRate = Math.round((lMonTotal - amount/month)*100)/100; // 월평균 이자금액 반올림
    let lMonPrice = Math.round(lMonTotal - lMonRate)

    // 콤마 찍기
    const comma = (number) => {
       return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return(
        <>
           <p><span style={style}>{comma(props.amount)}</span>만원을 {comma(props.period)}년동안 {comma(props.rate)}%로 대출받으시면 
              원리금균등상환 기준 매월 약 <span style={style}>{comma(lMonTotal)}</span>원씩 상환하시면 됩니다.
           </p>
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
                    <td>{comma(lMonPrice)}원</td>
                    <td>{comma(lMonRate)}원</td>
                    <td>{comma(lMonTotal)}원</td>
                    </tr>
                </tbody>
            </Table> 
        </>
    )
}
export default WonriGuemCalc;