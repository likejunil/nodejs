const cookie = (req, res, next) => {
    let visitCount = 0;
    
    // 수신한 쿠기 화인
    // const cookies = req.cookies;
    const cookies = req.signedCookies;
    if (Object.keys(cookies).length === 0) {
        console.log('쿠기 없음');
    } else {
        // 쿠키는 객체
        console.log('수신한 쿠기:', cookies);
        for (const m in cookies) {
            if (m === 'visitCount') {
                visitCount = parseInt(cookies[m]);
            }
        }
    }
    
    // 쿠키 삭제
    if (visitCount > 3) {
        console.log('쿠키 삭제');
        res.clearCookie('visitCount', {path: '/auth'});
        return next();
    }
    
    // 쿠키 생성
    console.log('쿠키 생성|수정');
    res.cookie('visitCount', visitCount + 1, {
        httpOnly: true,
        signed: true,
        path: '/auth',
        maxAge: 1000 * 60 * 5,
    });
    next();
    
};

export default cookie;
