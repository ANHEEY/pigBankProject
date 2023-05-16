// 원금 상환 계산기 : 대출받은 돈을 대출기간 동안 균등한 금액으로 매월 갚는 방식
import { Table } from 'react-bootstrap';

const style = {
    color: "green",
    fontWeight: "bold",
}

const WonriCalc = ({ props }) => {
    let amount = props.amount * 10000; // 대출원금 (만원) 
    let month = props.period * 12; // 대출기간 (년)
    let rate = props.rate;   // 대출금리

    let totalInterest = 0; // 총 이자금액
    let monPrincipal = Math.round(amount / month);  // 월 상환 원금 
    let balance = amount; // 내야하는 대출 원금 잔액
    let calcRate = rate * 0.01 / 12;

    for (let i = 1; i <= month; i++) {
      let interestPaid = balance * calcRate; // 남은 상환 원금에 대한 월 이자금 
      totalInterest += interestPaid; // 총 이자 금액 
      balance -=  monPrincipal; 
    }

    let avgInterest = Math.round(totalInterest / month); // 월평균 이자액
    let avgTotalPayment = avgInterest + monPrincipal; // 월평균 상환금액(이자+원금)

    // 콤마 찍기
    const comma = (number) => {
       return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return(
        <>
           <p><span style={style}>{comma(props.amount)}</span>만원을 {comma(props.period)}년동안 {comma(props.rate)}%로 대출받으시면 
              원금균등상환 기준 매월 약 <span style={style}>{comma(avgTotalPayment)}</span>원씩 상환하시면 됩니다.
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
                    <td>{comma(monPrincipal)}원</td>
                    <td>{comma(avgInterest)}원</td>
                    <td>{comma(avgTotalPayment)}원</td>
                    </tr>
                </tbody>
            </Table> 
        </>
    )
}
export default WonriCalc;