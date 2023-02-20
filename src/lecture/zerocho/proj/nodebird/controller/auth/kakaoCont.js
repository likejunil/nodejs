const passport = require('passport');
const log = console.log;

/**
 * << /auth/kakao >>
 * 1. passport-kakao package 는 client 에게 다음과 같이 302 redirect 를 한다.
 *      https://kauth.kakao.com/oauth/authorize?
 *          response_type=code&
 *          redirect_uri=http%3A%2F%2Flocalhost%3A8001%2Fauth%2Fkakao%2Fcallback&
 *          client_id=a824b6155ee9a02f2f0d83d2b22950f9
 *
 * 2. 해당 주소를 받은 client 는 https://kauth.kakao.com/oauth/authorize?... 으로 인증 화면을 요청한다.
 * 3. kakao 는 client 에게 동의 및 로그인 화면을 전송한다.
 * 4. client 는 kakao 에 로그인을 시도한다. (성공)
 * 5. 로그인에 성공하면 kakao 는 client 에게 인증 코드를 전송하고 /auth/kakao/callback 으로 redirect 를 안내한다.
 * 6. client 는 kakao 로부터 받은 인증코드를 /auth/kakao/callback 으로 보낸다.
 */
const login = (req, res, next) => {
    log();
    passport.authenticate('kakao')(req, res, next);
    log();
};

/**
 * << /auth/kakao/callback >>
 * 1. client 가 카카오를 통해 인증을 완료하면 다음 주소로 redirect 를 한다.
 *      http://localhost:8001/auth/kakao/callback?
 *          code=JUErXYUzg0fLPnC8vD9ZFA5e03EHfNwM-D3sE0aVmSXUdE9q_kN_mKET1lMnSzTrsolsmAoqJY4AAAGGa_mIXQ
 *
 * 2. 응답에 담긴 코드값으로 kakao 에 accessToken 및 사용자 정보를 요청한다.
 * 3. kakao 로부터 응답이 오면 kakaoStrategy 가 실행된다.
 * 4. kakaoStrategy 가 passport.authenticate('kakao', callback) 의 callback 을 실행한다.
 * 5. client 에게 응답한다.
 */
const callback = (req, res, next) => {
    log();
    passport.authenticate('kakao', {
        failureRedirect: '/?loginError=카카오로그인_실패',
    })(req, res, next);
    log();
};

const logout = (req, res, next) => {

};

module.exports = {
    login,
    callback,
    logout,
};
