module.exports = {
    users: [
        {id: 101, name: '강백호'},
        {id: 102, name: '송태섭'},
        {id: 103, name: '정대만'},
        {id: 104, name: '채치수'},
        {id: 105, name: '서태웅'},
    ],
    
    posts: [
        {id: 201, body: "행복", user_id: 101},
        {id: 202, body: "희망", user_id: 102},
        {id: 203, body: "기쁨", user_id: 103},
        {id: 204, body: "사랑", user_id: 104},
        {id: 205, body: "욕심", user_id: 105},
        {id: 206, body: "미련", user_id: 101},
        {id: 207, body: "열정", user_id: 102},
        {id: 208, body: "공포", user_id: 103},
        {id: 209, body: "좌절", user_id: 104},
        {id: 210, body: "믿음", user_id: 105},
    ],
    
    comments: [
        {id: 301, body: "가", user_id: 101, post_id: 201},
        {id: 302, body: "나", user_id: 102, post_id: 201},
        {id: 303, body: "다", user_id: 103, post_id: 202},
        {id: 304, body: "라", user_id: 104, post_id: 202},
        {id: 305, body: "마", user_id: 105, post_id: 203},
        {id: 306, body: "바", user_id: 101, post_id: 203},
        {id: 307, body: "사", user_id: 102, post_id: 203},
        {id: 308, body: "아", user_id: 103, post_id: 205},
        {id: 309, body: "자", user_id: 104, post_id: 205},
        {id: 310, body: "차", user_id: 105, post_id: 206},
        {id: 311, body: "카", user_id: 101, post_id: 206},
        {id: 312, body: "타", user_id: 102, post_id: 207},
        {id: 313, body: "파", user_id: 103, post_id: 208},
        {id: 314, body: "하", user_id: 104, post_id: 208},
        {id: 314, body: "꽝", user_id: 105, post_id: 210},
    ],
};

