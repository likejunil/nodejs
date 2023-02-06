import {Model} from "./initSequelize.js";

/**
 * --------------------------------------------------------------
 * '모델 클래스'는 table 의 schema 를 상징한다.
 * '모델 객체'는 하나의 row 를 의미한다.
 * ORM 은 obejct 와 row 의 mapping 을 나타낸다.
 * --------------------------------------------------------------
 *
 * 모델 객체 생성 (객체 -> model)
 * model = Model.build({name: 'june1', age: 49, married: true})
 *  => model: {name: 'june1', age: 49, married: true}
 *
 * 모델 갱신, 모델을 데이터베이스에 반영
 * model.set({name: 'june2', age: 21})
 *  => model: {name: 'june2', age: 21, married: true} (local 만 적용)
 * model.save()
 *  => model: {name: 'june2', age: 21, married: true}, db: {name: 'june2', age: 21, married: true}
 *
 * 모델 갱신, 일부만 데이터베이스 반영(인자로 주어진 정보만)
 * model.age = 30;
 *  => model: {name: 'june2', age: 30, married: true}, db: {name: 'june2', age: 21, married: true}
 * model.update({married: false})
 *  => model: {name: 'june2', age: 30, married: false}, db: {name: 'june2', age: 21, married: false}
 *
 * 일부만 데이터베이스 반영(모델 객체의 일부분만)
 * model.save({fields:['age']})
 *  => model: {name: 'june2', age: 30, married: false}, db: {name: 'june2', age: 30, married: false}
 *
 * 모델 삭제
 * model.destroy()
 * model.destroy({force: true})
 * model.restore({where: {name: 'june1'}})
 *
 * Model.create() => build + save
 * model.reload() => db 의 값을 불러와 모델 객체를 덮어씀
 *
 * 벌크 연산
 * Model.bulkCreate([{}, {}, ...])
 * Model.update({married: true}, {age: {[Op.gt]: 30}})
 * Model.destroy({where: {name: 'june2'}})
 *
 * 조회
 * find()
 *  - findAll(
 *      attributes,
 *      where,
 *      group,
 *      order,
 *      offset,
 *      limit)
 *
 *      . findAll({attributes: ['name', 'age']})
 *      . findAll({attributes: ['name', ['age', 'old']]})
 *
 *      . findAll({attributes: {
 *              include: [
 *                  [sequelize.fn('COUNT', sequelize.col('name')), 'count_name'],
 *              ],
 *          }})
 *      . findAll({attributes: {
 *              exclude: [
 *                  'name',
 *                  'age',
 *              ],
 *          }})
 *
 *      . findAll({
 *              where: {
 *                  name: 'june1',
 *                  married: true,
 *              }
 *          });
 *      . findAll({
 *              where: {
 *                  [Op.and]: [
 *                      {name: 'june1'},
 *                      {age: {[Op.gt]: 30}},
 *                      {married: true},
 *                  }
 *              }
 *          });
 *
 *       . findAll({order: [['name', 'DESC'], ['age', 'ASC']]})
 *       . findAll({group: 'name'})
 *       . findAll({limit: 10, offset: 8})
 *
 *  - findByPk()
 *  - findOne()
 *  - findOrCreate({
 *      where: {name: 'june1'},
 *      defaults: {job: 'programmer'},
 *  });
 *  - const {count, rows} = Model.findAndCountAll();
 *  -
 *
 * --------------------------------------------------------------
 * join
 * --------------------------------------------------------------
 * - eager loading
 * Member.findOne({
 *          attributes: {[
 *              name,
 *              age,
 *          ]},
 *          include: {
 *              model: Group,
 *              attribute: {[name]},
 *              where: {
 *                  size: {[Op.ne]: 'small'},
 *                  name: Sequelize.col('Member.name'),
 *              },
 *
 *              // true 일 경우 inner join, false 일 경우 outer join
 *              required: true,
 *
 *              // 일시 삭제된 정보를 로드하려는 경우
 *              paranoid: false,
 *          },
 *          where: {
 *              name: 'june1',
 *              '$Group.ceo$': {[Op.ne]: 'june3'},
 *          },
 *          order: [
 *              [Group, 'name', 'ASC'],
 *          ],
 *      })
 *
 * - lazy loading
 * june1 = Member.findOne({where: {name: 'june1'}};
 * juen1.getGroup();
 *
 * - 1:1
 * Member : Profile
 * member.setProfile(group);
 * (await member.getProfile()).name;
 * member.createProfile(new-group);
 * member.setProfile(null);
 *
 * - 1:N
 * Group: Member
 * (복수형의 경우 불규칙형도 자동 처리되며, Person 은 People 가 된다.)
 * group.getMembers(); // []
 * group.countMembers(); // 0
 * group.hasMember(m1); // false
 *
 * group.addMembers([m1, m2]);
 * group.removeMember(m2);
 * group.createMember(m3);
 * group.setMembers([]);
 *
 * << 직접 쿼리 사용 >>
 * sequelize.query(...)
 */

/**
 * UsersRepository 는 다음 4가지 method 를 구현한다.
 * . create()
 * . findAll()
 * . findById()
 * . findByUsername()
 */

const {User} = Model;

export const create = async (user) => {
    return User
        .create(user)
        .then(res => {
            const id = res.dataValues.id;
            return {...user, id};
        });
};

export const findById = async (id) => {
    return User.findByPk(id)
};

export const findByUsername = async (username) => {
    return User.findOne({where: {username}});
};

export const findAll = async () => {
    return User.findAll();
};
