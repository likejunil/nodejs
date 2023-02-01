const session = (req, res, next) => {
    /* req.session 은 해당 사용자만을 위한 전용 공간이다. */
    console.log('세션 수신:', req.session.data);
    
    /* 세션 수정 */
    console.log('세션 생성|수정')
    req.session.data = {
        ...req.session.data,
        place: 'earth',
        date: Date(),
    };
    
    /* 세션 삭제 */
    /*
    console.log('세션 삭제')
    req.session.destroy(console.err);
     */
    
    next();
};

export default session;
