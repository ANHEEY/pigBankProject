import React, { useState, useEffect, useRef } from "react";
import { Container, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams} from "react-router-dom";
import NoticeApiService from "../../../../admin/components/contents/csCenter/NoticeApiService";

function CsBoardDetail () {
    const {nnum} = useParams();
    const navigate = useNavigate();
    const [ntitle, setNtitle] = useState([]);
    const [ncontent, setNcontent] = useState('');
    const [nregDate, setNregDate] = useState([]);
    const [ncount, setNcount] = useState([]);
  
    const prevNnumRef = useRef();
  
    const back = () => {
      navigate('/customer/cscenter/cs_board');
    }
  
    useEffect(() => {
      if (prevNnumRef.current === nnum) {
        return; // 이전 nnum 값과 같으면 실행하지 않음
      }
  
      prevNnumRef.current = nnum; // 이전 nnum 값을 저장
  
      NoticeApiService.csboardDetail(nnum)
        .then(res => {
          setNtitle(res.data.ntitle);
          setNcontent(res.data.ncontent);
          setNregDate(new Date(res.data.nregDate).toISOString().slice(0,10));
          setNcount(res.data.ncount);
          console.log(res.data);
        });
    }, [nnum]);
 
    return(
        <Container>
            <h3>공지사항</h3>
            <hr />
            <br />
            <Table align="center">
                <thead>
                    <tr>
                        <th><h4>{ntitle}</h4></th>
                        <td>작성일자 : {nregDate}{' / '}조회수 : {ncount}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4}>
                            <pre align='left'>
                            {ncontent}
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} align="center">
                            <a onClick={back}><Button variant="primary" >이전</Button></a>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default CsBoardDetail