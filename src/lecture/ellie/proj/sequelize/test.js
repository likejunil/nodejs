const {Sequelize, Op, QueryTypes} = require('sequelize');
const {sequelize, models} = require('./repository/associateModel.js');
const {faker} = require('@faker-js/faker');
const log = console.log;

const {User, Family, Profile, Band,} = models;

const createRandomUser = (name) => {
    /* email, password, name */
    return {
        name: name ?? faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};

const createRandomFamily = (name) => {
    return {
        name: name ?? faker.name.fullName(),
    };
};

const a__User생성_저장_수정_Family연결 = async () => {
    /* 수동으로 하는 트랜잭션 관리 */
    const t = await sequelize.transaction()
    
    try {
        /* Model.destory() 는 where 조건이 없으면 에러가 발생한다. */
        /* truncate 옵션으로 destroy() 를 실행할 수 있다. */
        /* force: false 옵션을 통해 soft delete 를 선택할 수 있다. */
        await User.destroy({
            where: {id: {[Op.ne]: 0}},
            force: true,
            transaction: t,
        });
        await Family.destroy({
            where: {id: {[Op.ne]: 0}},
            force: true,
            transaction: t,
        });
        
        /**
         * User 생성 및 저장
         */
        const user = createRandomUser();
        const model = User.build(user);
        /* 특정 컬럼만을 선택하여 저장할 수 있다. */
        // await model.save();
        const saved = await model.save({
            fields: ['email', 'password'],
            transaction: t
        });
        
        /* build, save 를 create 하나로 적용할 수 있다. */
        const created = await User.create(createRandomUser(), {transaction: t});
        
        /**
         * User 수정
         */
        saved.set({name: '준일'});
        saved.email = 'likejunil@gmail.com';
        /* update() 는 반드시 인자가 필요하다. */
        /* 인자가 없으면 아무런 일도 일어나지 않는다. */
        await saved.update({transaction: t});
        /* name, email 갱신이 여기서 적용된다. */
        await saved.save({transaction: t});
        await created.update({name: '효진'}, {transaction: t});
        
        /**
         * Family 생성 및 저장
         */
        /* 객체를 데이터베이스에 저장하여 pk 를 생성해야만 다른 모델에 연결할 수 있다. */
        const family = Family.build(createRandomFamily());
        family.set({
            name: '권',
            head: saved.id,
        });
        /* familly 객체를 저장한다. 이제 다른 모델에 연결할 수 있다. */
        const saved_family = await family.save({transaction: t});
        
        // throw new Error('트랜잭션 테스트 중..');
        
        /**
         * Family 를 User 와 연결
         */
        /* 다음은 즉시 update 쿼리가 발생한다. */
        /* null 을 주입하여 테이블의 관계를 끊을 수 있다. => setFamily(null); */
        await saved.setFamily(saved_family, {transaction: t});
        await created.setFamily(saved_family, {transaction: t});
        
        /* 반드시 commit 을 하기 전에 afterCommit() 을 등록해야 한다. */
        t.afterCommit(() => log('커밋을 성공적으로 마쳤다.'));
        await t.commit();
        
    } catch (err) {
        console.error(err.message);
        await t.rollback();
    }
}

/**
 * 모두 즉시 데이터베이스에 반영되는 비동기 함수이다.
 * getUsers();
 * countUsers();
 * hasUser();
 * hasUsers();
 * setUsers();
 * addUser();
 * addUsers();
 * removeUser();
 * removeUsers();
 * createUser();
 */
const b__Family에서_User들_불러와서_다루기 = async () => {
    try {
        const family = await sequelize.transaction(async (t) => {
            /* eager 로딩, 즉시 join 된 데이터를 함께 가져온다. */
            /* findAll() 은 배열을, findOne() 은 객체를 반환한다. */
            /* 둘 다 데이터가 없으면 null 을 반환한다. */
            let loaded = await Family.findAll({
                attributes: ['id', 'name', 'head',],
                where: {
                    [Op.and]: {
                        name: {[Op.ne]: '나쁜 가족'},
                        head: {[Op.gt]: 1},
                    },
                },
                include: {
                    model: User,
                    attributes: ['id', 'name', 'email',],
                    where: {
                        name: '준일',
                        id: {[Op.gt]: Sequelize.col('Family.id')},
                    },
                    /* false: LEFT OUTER JOIN */
                    /* true: INNTER JOIN */
                    required: false,
                },
                order: [
                    ['id', 'DESC'],
                    [User, 'createdAt', 'ASC'],
                ],
                offset: 0,
                limit: 1,
            });
            
            if (loaded.length === 0) {
                console.error('조건에 부합되는 데이터가 없습니다.');
                return;
            }
            
            let family = loaded[0];
            const user = {
                /* User 모델의 복수 Users 로 접근하는 것을 주의할 것 */
                /* Family(1):(N)User 의 관계이기 때문 */
                /* Users[0] 은 id, name, email 속성을 갖고 있지 않다. */
                id: family.Users[0].id,
                name: family.Users[0].name,
                email: family.Users[0].email,
            };
            
            /* getUsers() 와 같은 함수는 항상 쿼리를 발생시킨다. */
            const users = await family.getUsers();
            /* 다음은 이미 불러온 데이터가 있음에도 불구하고 다시 실시간 쿼리를 발생시킨다. */
            const count = await family.countUsers();
            const has = await family.hasUser(users[0]);
            await family.removeUser(users[1], {transaction: t});
            
            // throw new Error('트랜잭션 테스트 중..');
            
            await family.addUser(users[1], {transaction: t});
            
            /* findAll() 은 배열을, findOne() 은 객체를 반환한다. */
            /* 둘 다 데이터가 없으면 null 을 반환한다. */
            family = await Family.findOne({
                where: {id: family.id},
                include: {
                    model: User,
                    /* false: LEFT OUTER JOIN */
                    /* true: INNTER JOIN */
                    required: false,
                },
            })
            
            t.afterCommit(() => log('또! 커밋을 성공적으로 마쳤다.'));
            
            return family;
        });
        
        log('객체로 변환하기 전, name:', family.name);
        /* JSON.stringify() 은 문자열 */
        /* toJSON() 은 객체 */
        log('객체로 변환한 후, name:', family.toJSON().name);
        
    } catch (err) {
        console.error(err.message);
    }
};

const c__다양한_함수들_사용하기 = async () => {
    try {
        await sequelize.transaction(async (t) => {
            /**
             * << Model.findOrCreate() >>
             * - 원하는 데이터를 찾지 못하면 해당 데이터를 생성하고 돌려준다.
             * - 객체가 아니라 배열을 반환한다.
             */
            let [user, created] = await User.findOrCreate({
                where: {email: 'apple@earth.com',},
                defaults: {password: faker.internet.password(),},
                transaction: t,
            });
            
            if (created) {
                log('데이터를 찾지 못해서 그냥 만들었다.');
            }
            
            /**
             * << Model.upsert() >>
             * - INSERT INTO ${table} (...) VALUES (...) ON DUPLICATE KEY UPDATE ...
             * - 데이터를 삽입할 때 pk | uk 가 중복되었다면 지정한 데이터만 갱신한다.
             * 1) insert, update 무엇이든 default 값이 없는 column 은 무조건 입력해야 한다.
             * 2) pk 를 입력했다면.. pk 에 해당하는 데이터가 존재한다면 update 가 적용된다.
             * 3) pk 를 입력하지 않았지만 uk 를 입력했다면, 해당 uk 에 해당하는 데이터가 존재한다면 update 가 적용된다.
             * 4) pk, uk 모두 입력하지 않았다면 insert 가 적용된다.
             *
             * model.destory()
             */
            [user, created] = await User.upsert({
                /* pk 가 없어도 emil(uk) 때문에 update 가 적용되었다. */
                email: user.email,
                password: faker.internet.password(),
                name: '세한',
            }, {
                transaction: t,
            });
            
            if (!created) {
                log('데이터를 입력하려는데 이미 있어서 그냥 갱신했다.');
            }
            
            /* force 옵션에 true 를 할당하여 완전히 삭제한다. */
            /* model.destroy() 는 삭제된 model 을 반환한다. */
            /* Model.destroy() 는 삭제된 건수를 반환한다. */
            let ret = await user.destroy({
                force: true,
                transaction: t
            });
            
            /**
             * << Model.bulkCreate() >>
             * - 생성한 model 들을 배열로 돌려준다.
             *
             * Model.update()
             * Model.destroy()
             * Model.restore()
             */
            const users = await User.bulkCreate([
                createRandomUser('강백호'),
                createRandomUser('윤대협'),
                createRandomUser('서태웅'),
                createRandomUser('채치수'),
                createRandomUser('송태섭'),
                createRandomUser('정대만'),
                createRandomUser('정우성'),
            ], {transaction: t});
            
            /* 배열을 반환한다. */
            /* [0] 갱신한 데이터의 개수 */
            ret = await User.update({
                password: '***해킹당함***',
            }, {
                where: {
                    name: {[Op.in]: ['강백호', '윤대협']},
                    family_id: null,
                },
                transaction: t,
            });
            
            /* 삭제된 데이터의 개수 반환 */
            ret = await User.destroy({
                where: {family_id: null,},
                // force: true,
                transaction: t,
            });
            
            /* 복구된 데이터의 개수 반환 */
            /* soft deleted 만을 대상으로 함 */
            ret = await User.restore({
                where: {name: '강백호',},
                transaction: t,
            });
            
            /**
             * findAndCountAll()
             */
            const size = 3;
            const page = 1;
            const {count, rows} = await User.findAndCountAll({
                where: {family_id: null,},
                /* soft deleted 항목들을 포함 */
                paranoid: false,
                offset: size * (page - 1),
                limit: size,
                transaction: t,
            });
            
            t.afterCommit(() => {
                log('나는 커밋이 완료되는 곳에 항상 나타난다.')
            });
        });
        
    } catch (err) {
        /* ... */
        console.error(err.message);
    }
}

const d__페이지_활용하기 = async () => {
    /**
     * findAndCountAll()
     */
    const paging = async (page, size) => {
        const {count, rows} = await User.findAndCountAll({
            where: {family_id: null,},
            /* soft deleted 항목들을 포함 */
            paranoid: false,
            offset: size * (page - 1),
            limit: size,
        });
        
        log(`페이지: ${page}, 사이즈: ${rows.length}`);
        for (const row of rows)
            log(`   - ${row.name}`);
    }
    
    const size = 3;
    for (const page of [1, 2, 3]) {
        await paging(page, size);
    }
};

const e__직접_쿼리사용하기 = async () => {
    try {
        await sequelize.transaction(async (t) => {
            const manager = await User.findOne({where: {name: '준일',},});
            
            const user = {
                ...createRandomUser('준일님'),
                Family: {
                    name: '권님',
                    head: manager.id,
                },
                Profile: {
                    joinDate: new Date(),
                    gender: '남자',
                    birthday: new Date(1975, 3, 12),
                    age: 49,
                    married: true,
                },
                Bands: [
                    {name: faker.word.noun(32), manager: manager.id},
                    {name: faker.word.noun(32), manager: manager.id},
                ],
            }
            
            const saved = await User.create({...user}, {
                include: [Profile, Family, Band],
                transaction: t,
            });
            
            let ret, affected;
            /* insert 된 row 의 pk 가 ret 에 반환된다. */
            /* 입력된 row 의 개수가 affectred 에 반환된다. */
            [ret, affected] = await sequelize.query(
                "insert into user (email, password, name, created_at, updated_at) values "
                + "(:email, :password, :name, :created_at, :updated_at)",
                {
                    type: QueryTypes.INSERT,
                    replacements: {
                        ...createRandomUser(),
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    transaction: t,
                }
            );
            
            /* update 의 경우 ret 은 undefined 가 반환된다. */
            /* 갱신된 row 의 개수가 affectred 에 반환된다. */
            [ret, affected] = await sequelize.query(
                "update user set name = :name where id = :id",
                {
                    type: QueryTypes.UPDATE,
                    replacements: {
                        name: '이강',
                        id: ret,
                    },
                    transaction: t,
                }
            );
            
            /* select 의 경우 결과 배열을 반환한다. */
            ret = await sequelize.query(""
                + " SELECT * "
                + "   FROM user "
                + "  WHERE name IN(:names) "
                + "     OR password LIKE :password ",
                {
                    type: QueryTypes.SELECT,
                    replacements: {
                        names: ['준일', '효진'],
                        password: '%해킹당함%',
                    },
                    logging: console.log,
                    /* plain 이 true 이면 첫 번째 record 만을 반환한다.(객체) */
                    /* plain 이 false 이면 검색 결과 모두를 반환한다.(배열) */
                    plain: false,
                    /* model 옵션이 주어지면 검색 결과를 model 로 변환하여 반환한다. */
                    model: User,
                },
            );
            
            /* undefiend 를 반환한다. */
            ret = await sequelize.query(""
                + " DELETE FROM user "
                + "  WHERE name = :name",
                {
                    type: QueryTypes.DELETE,
                    replacements: {
                        name: '준일님',
                    },
                    transaction: t,
                },
            );
            
        });
        
    } catch (err) {
        console.error(err);
    }
};

const proc = async () => {
    await a__User생성_저장_수정_Family연결();
    await b__Family에서_User들_불러와서_다루기();
    await c__다양한_함수들_사용하기();
    await d__페이지_활용하기();
    await e__직접_쿼리사용하기();
    
}

module.exports = proc;
