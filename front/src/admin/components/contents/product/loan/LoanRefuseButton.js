import  React, {useState} from "react";
import  LoanApiService from "./LoanApiService";
import { Button, Modal, Form, Col } from 'react-bootstrap';

const LoanRefuseButton = ({ lreqNum, onUpdate  }) => {

    // 모달 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 거절 사유
    const [lreason, setLreason] = useState("");
            
    // 거절 버튼
    const goRefuse = (lreason) => {
        LoanApiService.updateRefuse(lreqNum, lreason)
        .then(res => {
        alert("승인거절처리되었습니다.");
        onUpdate(lreqNum); // 부모 컴포넌트에 있는 onUpdate 함수를 호추랗면서 값전달
        setLreason("");
        setShow(false);
        })
        .catch(err => {
            console.log(' updateRefuse() 에러', err)
        })
    }

    return(
        <div>
            <Button className="customerinfoBtn" onClick={handleShow}>
                거절
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>거절 사유</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm="12">
                        <Form.Control 
                        type="text" 
                        placeholder="거절사유를 간략히 입력해주세요." 
                        value={lreason}
                        onChange={(e) => setLreason(e.target.value)}/>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="success" onClick={() => goRefuse(lreason)}>확인</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default LoanRefuseButton;