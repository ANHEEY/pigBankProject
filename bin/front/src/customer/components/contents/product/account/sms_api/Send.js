exports.send = async function (req, res) {

    const phoneNumber = req.body.phoneNumber;
  
    Cache.del(phoneNumber);
  
    //인증번호 생성
    const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  
    Cache.put(phoneNumber, verifyCode.toString());
  
    axios({
      method: method,
      json: true,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-timestamp': date,
        'x-ncp-apigw-signature-v2': signature,
      },
      data: {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: '01041360094',
        // 메시지 내용
        content: `인증번호 [${verifyCode}]를 입력해주세요.`,
        messages: [
          {
            to: `${phoneNumber}`,
          },
        ],
      }, 
      })
    .then(function (res) {
      res.send(response(baseResponse.SMS_SEND_SUCCESS));
    })
    .catch((err) => {
      if(err.res == undefined){
        res.send(response(baseResponse.SMS_SEND_SUCCESS));
      }
      else res.sned(errResponse(baseResponse.SMS_SEND_FAILURE));
    });
};