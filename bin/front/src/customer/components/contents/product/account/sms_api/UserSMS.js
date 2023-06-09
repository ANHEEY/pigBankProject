import axios from "axios";

function UserSMS () {

    const secret_key = require("./../sms_api/config/Secret_sms");

    // 모듈
    const finErrCode = 404;
    const axios = require('axios');
    const Cache = require('memory-cache');
    const CryptoJS = require('crypto-js');
    const date = Date.now().toString();

    const uri = secret_key.NCP_serviceID;
    const secretKey = secret_key.NCP_secretKey;
    const accessKey = secret_key.NCP_accessKey;

    const method = 'POST';
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${secret_key.NCP_serviceID}/messages`;
    const url2 = `/sms/v2/services/${secret_key.NCP_serviceID}/messages`;

    const  hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
}
export default UserSMS;