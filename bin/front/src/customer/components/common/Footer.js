import React from "react";
import {Container, Row, Col} from 'react-bootstrap';

function Footer() {
    return (
    <footer id="footer" className="bg-light py-3" fixed="bottom">
      <Container> {/* fixed="bottom" footer고정 */}
        <Row>
          <Col md={6}>
            <p>&copy; 2023 PIGBANK(Kosmo)</p>
          </Col>
          <Col md={6} className="justify-content-end">
            <p>
                
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
    )
}
export default Footer;