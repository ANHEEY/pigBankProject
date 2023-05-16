import  React, {useState, useEffect} from "react";
import { Button, Form, Stack } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 css를 적용하기 위함
import { useNavigate } from "react-router-dom";
import LoanApiService from './LoanApiService.js';

const LoanComponentDetail = () => {

    // select 박스 값 설정
    const [lGradeSelected, setLGradeSelected ] = useState('')
    const [lTypeSelected, setLTypeSelected ] = useState('')

    // Input 값 설정
    const [inputs, setInputs] = useState({
        lsubTitle: "",
        lcontent: "",
        lgrade: "",
        lmaxPeriod: "",
        lmaxPrice: "",
    })

    useEffect(() => {
        LoanApiService.fetchProductByName(window.localStorage.getItem("lpdName"))
        .then(res => {
        // 불러온 값을 담는다.
        // console.log(res.data);
        setInputs(res.data);
        // select 박스 설정
        setLGradeSelected(res.data.lgrade);
        setLTypeSelected(res.data.ltype);
        window.localStorage.removeItem("lpdName");
        })
        .catch(err => {
        console.log('fetchProdcutList Error!', err);
        });
    }, [window.localStorage.getItem("lpdName")]);
    
    // reset 버튼 
    const handelResetButton = () => {
    setInputs({
        lsubTitle: "",
        lcontent: "",
        lgrade: "",
        lmaxPeriod: "",
        lmaxPrice: "",
    });
    };

    // lgrade 선택시 
    const handleSelectChange1 = (e) => {
        setLGradeSelected(e.target.value)
    }

    const handleInputValue = (e) => {

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

        console.log(lGradeSelected);
       
        const pdLoan = {
            lpdName: inputs.lpdName,
            lsubTitle: inputs.lsubTitle,
            lcontent: inputs.lcontent,
            lgrade: lGradeSelected,
            lmaxPeriod: inputs.lmaxPeriod,
            lmaxPrice: inputs.lmaxPrice,
        }
        
        console.log("입력 수정한 내용: " + pdLoan);

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
                <Form.Control type="text" id="lpdName" name="lpdName" value={inputs.lpdName} placeholder="대출상품명을 입력해주세요." disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>* 대출상품 한줄요약</Form.Label>
                <Form.Control required as="textarea" rows={3}  id="lsubTitle" name="lsubTitle" value={inputs.lsubTitle} placeholder="대출상품 한줄요약을 간략히 입력해주세요." onChange={handleInputValue}/>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>* 대출상품설명</Form.Label>
                <Form.Control as="textarea" rows={3} id="lcontent" name="lcontent" value={inputs.lcontent} placeholder="대출상품설명을 간략히 적어주세요." onChange={handleInputValue} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>* 대출신청자격</Form.Label>
                <Form.Select id="lGrade" name="lGrade" value={lGradeSelected} onChange={handleSelectChange1} required>
                    <option value="미지정">신청가능한 자격 등급을 선택헤주세요.</option>
                    <option value="gold">gold</option>
                    <option value="black">black</option>
                    <option value="red">red</option>
                    <option value="yellow">yellow</option>
                </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>* 대출가능 최장기간</Form.Label>
                <Form.Control type="text" id="lmaxPeriod" name="lmaxPeriod" value={inputs.lmaxPeriod} min={1} max={5} placeholder="년" onChange={handleInputValue} required />
                <Form.Text className="text-muted">
                    연단위로 입력해주세요.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>* 대출가능 최고금액</Form.Label>
                <Form.Control type="number" id="lmaxPrice" name="lmaxPrice" value={inputs.lmaxPrice} min={1} placeholder="만원" onChange={handleInputValue} required />
                <Form.Text className="text-muted">
                    만원단위로 입력해주세요.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>* 대출이자</Form.Label>
                <Form.Control type="number" id="lrate" name="lrate" value={inputs.lrate} placeholder="% "onChange={handleInputValue} disabled/>
                <Form.Text className="text-muted">
                    소수점 둘째자리까지만 입력해주세요.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>* 대출상환방법</Form.Label>
                <Form.Select id="lType" name="lType" value={lTypeSelected} disabled>
                    <option value="미지정">상환방법을 선택하세요.</option>
                    <option value="원리금균등분할상환">원리금 균등분할상환</option>
                    <option value="원금균등분할상환">원금 균등분할상환</option>
                    <option value="만기일시상환">만기일시상환</option>
                </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                <Form.Label>* 중도상환 수수료율</Form.Label>
                <Form.Control type="number" id="lcxlRate" name="lcxlRate" value={inputs.lcxlRate} placeholder="%" onChange={handleInputValue} disabled/>
                <Form.Text className="text-muted">
                    소수점 둘째자리까지만 입력해주세요.
                </Form.Text>
                </Form.Group>

                <Stack direction="horizontal" gap={2} className="col-md-2 mx-auto">
                <Button variant="success" type="submit">수정</Button>
                <Button variant="outline-secondary" onClick={() => handelResetButton()}>초기화</Button>
                </Stack>
            </Form>
        </div>
    </div> 
    )
}
export default LoanComponentDetail;