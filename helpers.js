var crypto=require('crypto')
exports.getSalt=function  getSalt() {
    return crypto.randomBytes(128).toString('base64');

}
//hash function
exports.EncryptPass=function (Password,salt) {

    let hmac = crypto.createHmac('sha1',salt);

    return hmac.update(Password.toString()).digest('hex');


}

exports.MatchPass=function (db_salt,db_password,userpassword) {

    if(db_password==this.EncryptPass(userpassword,db_salt))
        return true;
    return false;
}


