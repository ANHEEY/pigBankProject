import React from "react";
import UserSMS from "./UserSMS";

export default function userRoute () {

    const user = require('./UserSMS');

    // 문자인증 전송 API
    app.post('/app/send', user.send);

    // 문자인증 검증 API
    app.post('/app/verify', user.verify);
}
