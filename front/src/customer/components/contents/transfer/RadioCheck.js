import React from "react";
import Form from 'react-bootstrap/Form';

function RadioCheck(props) {
  const handlechange = (event) => {
    const astate = event.target.value;
    props.onChange(astate);
  }
    return (
        <Form onChange={handlechange}>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="정상"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
            value={'using'}
          />
          <Form.Check
            inline
            label="전체(해지포함)"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            value={'u'}
          />
          <Form.Check
            inline
            label="해지"
            name="group1" 
            type={type}
            id={`inline-${type}-3`}
            value={'unusing'}
          />
        </div>
      ))}
    </Form>
    )
}
export default RadioCheck;