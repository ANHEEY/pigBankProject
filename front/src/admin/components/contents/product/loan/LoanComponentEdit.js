import  React, {useState, useEffect} from "react";
import { Button, Form, Stack } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 css를 적용하기 위함
import { useNavigate } from "react-router-dom";
import LoanApiService from './LoanApiService.js';

const LoanComponentDetail = () => {

    useEffect(() => {
        LoanApiService.fetchProductByName(window.localStorage.getItem("lpdName"))
          .then(res => {
            let product = res.data;
            setInputs({
                lpdName: product.lpdName,
                lsubTitle: product.lsubTitle,
                lcontent: product.lcontent,
                lgrade: product.lgrade,
                lmaxPeriod: product.lmaxPeriod,
                lmaxPrice: product.lmaxPrice,
                lrate: product.lrate,
                ltype: product.ltype,
                lcxlRate: product.lcxlRate,
                lregDate: product.lregDate
            })
          })
          .catch(err => {
            console.log('fetchProdcutList Error!', err);
          });
    }, []);
    
    // select 박스 값 설정
    const [lGradeSelected, setLGradeSelected ] = useState('')
    const [lTypeSelected, setLTypeSelected ] = useState('')
    
    // reset 버튼 
    const handelResetButton = () => {
    setInputs({
        lpdName: "",
        lsubTitle: "",
        lcontent: "",
        lgrade: "",
        lmaxPeriod: "",
        lmaxPrice: "",
        lrate: "",
        ltype: "",
        lcxlRate: "",
        lregDate: ""
    });
    };

    const handleSelectChange1 = (e) => {
        setLGradeSelected(e.target.value)
    }

    const handleSelectChange2 = (e) => {
        setLTypeSelected(e.target.value)
    }

    // Input 값 설정
    const [inputs, setInputs] = useState({
        lpdName: "",
        lsubTitle: "",
        lcontent: "",
        lgrade: lGradeSelected,
        lmaxPeriod: "",
        lmaxPrice: "",
        lrate: "",
        ltype: lTypeSelected,
        lcxlRate: "",
    })

    const handleInputValue = (e) => {
        // 소수점 처리
        const value = e.target.name === 'lrate' || e.target.name === "lcxlRate"? parseFloat(e.target.value) : e.target.value;

        setInputs(prevState => {
            return{
                ...prevState,
                [e.target.name] : e.target.value
            }
        })
    }

    const navigate = useNavigate();

    // submit 버튼
    const submit = (e) => {
        e.preventDefault(); // submit으로 인한 폼 데이터 서버 전송을 막는다.

        let pdLoan = {
            lpdName: inputs.lpdName,
            lsubTitle: inputs.lsubTitle,
            lcontent: inputs.lcontent,
            lgrade: lGradeSelected,
            lmaxPeriod: inputs.lmaxPeriod,
            lmaxPrice: inputs.lmaxPrice,
            lrate: inputs.lrate,
            ltype: lTypeSelected,
            lcxlRate: inputs.lcxlRate
        }
        
        console.log(pdLoan);

        LoanApiService.editProduct(pdLoan) 
            .then(res => {
                alert("상품이 수정되었습니다.")
                console.log("대출상품 수정성공");
                navigate('/admin/product/loan');
            })
            .catch(err => {
                console.log(' editProduct 에러', err)
            })

    }
    return(
        <div className="component-div">
         <div className="admin-title" style={{width:1000}}>
            대출상품 상세페이지
        </div>
        <div style={{width:1000}}>
            <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                <Form.Label>* 대출상품명</Form.Label>
                <Form.Control readOnly type="text" name="lpdName" value={inputs.lpdName} placeholder="대출상품명을 입력해주세요." onChange={handleInputValue} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>* 대출상품 한줄요약</Form.Label>
                <Form.Control required as="textarea" rows={3} name="lsubTitle" value={inputs.lsubTitle} placeholder="대출상품 한줄요약을 간략히 입력해주세요." onChange={handleInputValue}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>* 대출상품설명</Form.Label>
                <Form.Control as="textarea" rows={3} name="lcontent" value={inputs.lcontent} placeholder="대출상품설명을 간략히 적어주세요." onChange={handleInputValue} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>* 대출신청자격</Form.Label>
                <Form.Select name="lGrade" value={lGradeSelected} onChange={handleSelectChange1} required>
                    <option value="ALL">신청가능한 자격 등급을 선택헤주세요.</option>
                    <option value="gold">gold</option>
                    <option value="black">black</option>
                    <option value="red">red</option>
                    <option value="yellow">yellow</option>
                </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>* 대출가능 최장기간</Form.Label>
                <Form.Control type="text" name="lmaxPeriod" value={inputs.lmaxPeriod} min={1} max={5} placeholder="년" onChange={handleInputValue} required />
                <Form.Text className="text-muted">
                    연단위로 입력해주세요.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>* 대출가능 최고금액</Form.Label>
                <Form.Control type="number" name="lmaxPrice" value={inputs.lmaxPrice} min={1} placeholder="만원" onChange={handleInputValue} required />
                <Form.Text className="text-muted">
                    만원단위로 입력해주세요.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>* 대출이자</Form.Label>
                <Form.Control type="number" name="lrate" value={inputs.lrate} min={0.01} step={0.01} placeholder="% "onChange={handleInputValue} required />
                <Form.Text className="text-muted">
                    소수점 둘째자리까지만 입력해주세요.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>* 대출상환방법</Form.Label>
                <Form.Select name="lType" value={lTypeSelected} onChange={handleSelectChange2} required >
                    <option value="미지정">상환방법을 선택하세요.</option>
                    <option value="원리금균등분할상환">원리금 균등분할상환</option>
                    <option value="원금균등분할상환">원금 균등분할상환</option>
                    <option value="만기일시상환">만기일시상환</option>
                </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>* 중도상환 수수료율</Form.Label>
                <Form.Control type="number" name="lcxlRate" value={inputs.lcxlRate} min={0.01} step={0.01} placeholder="%" onChange={handleInputValue} required/>
                <Form.Text className="text-muted">
                    소수점 둘째자리까지만 입력해주세요.
                </Form.Text>
                </Form.Group>

                <Stack direction="horizontal" gap={2} className="col-md-2 mx-auto">
                <Button variant="success" type="submit">수정</Button>
                <Button variant="outline-secondary" onClick={() => handelResetButton()}>취소</Button>
                </Stack>
            </Form>
        </div>
    </div> 
    )
}
export default LoanComponentDetail;