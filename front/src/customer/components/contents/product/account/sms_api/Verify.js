exports.verify = async function (req, res) {
    const phoneNumber = req.body.phoneNumber;
    const verifyCode = req.body.verifyCode;

    const CacheData = Cache.get(phoneNumber);

    if (!CacheData) {
      return res.send(errResponse(baseResponse.FAILURE_SMS_AUTHENTICATION));
    } else if (CacheData !== verifyCode) {
        return res.send(errResponse(baseResponse.FAILURE_SMS_AUTHENTICATION));
    } else {
      Cache.del(phoneNumber);
      return res.send(response(baseResponse.SMS_VERIFY_SUCCESS));     
    }
};