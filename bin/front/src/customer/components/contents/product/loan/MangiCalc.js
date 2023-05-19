// 만기 상환 계산기
import { Table } from 'react-bootstrap';

    const style = {
        color: "green",
        fontWeight: "bold",
    }

    const MangiCalc = ({ props }) => {
        let amount = props.amount * 10000; // 대출원금 (만원) 
        let month = props.period * 12; // 대출기간 (년)
        let rate = (props.rate * 0.01) / 12;   // 대출금리 (년)

        // const totalPayment = Math.round(amount * (1 + rate * month)); // 만기시 내야하는 총 상환금액
        // const avgTotalPay = Math.round(totalPayment / month);
        const avgMonPrincipal = Math.round(amount / month); // 월 평균 상환 원금
        const avgMonInterest = Math.round(avgMonPrincipal * rate *month);

        // 금액 콤마 찍기
        const comma = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }

        return(
            <>
            <p><span style={style}>{comma(props.amount)}</span>만원을 {comma(props.period)}년동안 {comma(props.rate)}%로 대출받으시면 
                만기일시상환 기준 매월 약 <span style={style}>{comma(avgMonInterest)}</span>원씩 상환하시면 됩니다.
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
                        <td>0원</td>
                        <td>{comma(avgMonInterest)}원</td>
                        <td>{comma(avgMonInterest)}원</td>
                        </tr>
                    </tbody>
                </Table> 
            </>
        )
    }
export default MangiCalc;