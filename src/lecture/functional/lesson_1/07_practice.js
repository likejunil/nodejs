const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');
const {users, posts, comments} = require('../data/data2.js');
const {identity, get, map, go, filter, pluck, pipe, find, count_by, group_by, index_by} = require('./fp.js');

/**
 * _.index_by
 * _.group_by
 * _.pluck
 * _.uniq
 * _.count_by
 */

// 랜덤하게 유저 선택하기
const get_user = (() => {
    let user;
    return users => {
        if (user != null) return user;
        user = users[Math.floor(Math.random() * users.length)];
        console.log(`userid=|${user.id}|가 선택되었습니다.`);
        return user;
    };
})();

// 특정 유저가 작성한 게시글들 선택하기
const posts_by_user = user => {
    return filter(posts, post => post.user_id === user.id);
};

// 게시글들에 달린 댓글들 선택하기
const comments_by_posts = pipe(
    pluck('id'),
    post_ids => filter(comments, comment => post_ids.includes(comment.post_id)),
);

// 1. 특정인이 작성한 posts 에 대하여 연결된 모든 comments 찾기
const f11 = () => {
    go(
        get_user(users),
        posts_by_user,
        comments_by_posts,
        console.log,
    );
}

// 2. 특정인이 작성한 posts 에 대해서 comments 를 단 친구들의 이름을 뽑기
const f12 = () => {
    go(
        get_user(users),
        posts_by_user,
        comments_by_posts,
        map(comment => find(users, user => user.id === comment.user_id)),
        pluck('name'),
        _.uniq,
        console.log,
    );
};

// 3. 특정인이 작성한 posts 에 대해서 comments 를 단 친구들의 카운트 정보
const f13 = () => {
    go(
        get_user(users),
        posts_by_user,
        comments_by_posts,
        map(comment => find(users, user => user.id === comment.user_id)),
        count_by(user => user.name),
        console.log,
    );
};

// 특정 유저가 생성한 댓글들 선택하기
const comments_by_user = user => {
    return filter(comments, comment => comment.user_id === user.id);
};

// 댓글들을 기준으로 게시글들 선택하기
const posts_by_comments = pipe(
    pluck('post_id'),
    post_ids => filter(posts, post => post_ids.includes(post.id)),
);

// 4. 특정인이 comments 를 단 posts 찾기
const f14 = () => {
    go(
        get_user(users),
        comments_by_user,
        posts_by_comments,
        _.uniq,
        console.log,
    );
};

// f11();
// f12();
// f13();
// f14();

// users + posts + comments 새로운 데이터 구조 생성
const users_indexed_by_id = index_by(users, user => user.id);

const comments2 = map(comments, comment => {
    const user = users_indexed_by_id[comment.user_id];
    return Object.assign({}, comment, {user});
});
const commments_indexed_by_postid = group_by(comments2, comment => comment.post_id);
const commments_indexed_by_userid = group_by(comments2, comment => comment.user_id);

const posts2 = map(posts, post => {
    const user = users_indexed_by_id[post.user_id] ?? {};
    const comment = commments_indexed_by_postid[post.id] ?? [];
    return Object.assign({}, post, {user, comment});
});
const posts_indexed_by_userid = group_by(posts2, post => post.user_id);

const users2 = map(users, user => {
    const post = posts_indexed_by_userid[user.id] ?? [];
    const comment = commments_indexed_by_userid[user.id] ?? [];
    return Object.assign({}, user, {post, comment});
});
const users2_indexed_by_id = index_by(users2, user => user.id);

// 1. 특정인이 작성한 posts 에 대하여 연결된 모든 comments 찾기

const f21 = () => {
    const id = get_user(users2).id;
    go(
        users2_indexed_by_id[id],
        get('post'),
        pluck('comment'),
        _.deepFlatten,
        console.log,
    );
};

// 2. 특정인이 작성한 posts 에 대해서 comments 를 단 친구들의 이름을 뽑기
const f22 = () => {
    const id = get_user(users2).id;
    go(
        users2_indexed_by_id[id],
        get('post'),
        pluck('comment'),
        _.deepFlatten,
        pluck('user'),
        pluck('name'),
        _.uniq,
        console.log,
    );
};

// 3. 특정인이 작성한 posts 에 대해서 comments 를 단 친구들의 카운트 정보
const f23 = () => {
    const id = get_user(users2).id;
    go(
        users2_indexed_by_id[id],
        get('post'),
        pluck('comment'),
        _.deepFlatten,
        pluck('user'),
        pluck('name'),
        count_by(identity),
        console.log,
    );
};
// 4. 특정인이 comments 를 단 posts 찾기
const f24 = () => {
    // const id = get_user(users2).id;
    const id = 101;
    go(
        users2_indexed_by_id[id],
        get('comment'),
        pluck('post_id'),
        _.uniq,
        post_ids => filter(posts2, post => post_ids.includes(post.id)),
        data => JSON.stringify(data, null, 2),
        console.log,
    );
};

// f21();
// f22();
// f23();
f24();
