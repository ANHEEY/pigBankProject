import React from "react";
import Form from 'react-bootstrap/Form';

function Checkbox () {
    return (
        <Form>
          {['checkbox'].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check 
                type={type}
                id={`default-${type}`}
              />
            </div>
          ))}
        </Form>
      );
}

export default Checkbox;