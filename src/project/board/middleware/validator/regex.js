const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,15}$/;
const uniqueIdRegex = /^[\w|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,12}$/;
const tagRegex = /^#[\w|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,32}$/;
const nickRegex = uniqueIdRegex;

module.exports = {
    passwordRegex,
    uniqueIdRegex,
    tagRegex,
    nickRegex,
};
