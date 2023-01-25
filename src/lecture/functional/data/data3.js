/**
 * animal
 * 고양이 cat
 * 강아지 dog
 * 사자 lion
 * 호랑이 tiger
 * 곰 bear
 * 코끼리 elephant
 * 원숭이 monkey
 * 돼지 pig
 * 고래 whale
 */

/**
 * color
 * 빨강 red
 * 녹색 green
 * 파랑 blue
 * 검정 black
 * 하얀 white
 * 분홍 pink
 * 주황 orange
 * 노랑 yellow
 */

/**
 * fruit
 * 사과 apple
 * 포도 grapes
 * 망고 mango
 * 오렌지 oragne
 * 복숭아 peach
 * 딸기 strawberry
 * 바나나 banana
 * 토마토 tomato
 * 체리(앵두) cherry
 */

/**
 * planet
 * 수성 Mercury
 * 금성 Venus
 * 지구 Earth
 * 화성 Mars
 * 목성 Jupiter
 * 토성 Saturn
 * 천왕성 Uranus
 * 해왕성 Neptune
 */

/**
 * huge
 * big
 * large
 * medium
 * small
 * tiny
 */

const {_, L} = require('../lib/fp.js');
const log = console.log;

const planet = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune",];
const animal = ["cat", "dog", "lion", "tiger", "bear", "elephant", "monkey", "pig", "whale",];
const fruit = ["apple", "grapes", "mango", "oragne", "peach", "strawberry", "banana", "tomato", "cherry",];
const color = ["red", "green", "blue", "black", "white", "pink", "orange", "yello",];
const size = ["tiny", "small", "medium", "large", "big", "huge",];

const random_int = (min, max) => {
    return Math.floor(Math.random(min, max) * (max - min));
};

const pick_random = (list) => {
    const i = random_int(0, list.length);
    return list[i];
};

/**
 * {
 *     "Earth": {
 *         "cat": {
 *             "apple": {
 *                 "color": "red",
 *                 "size": "tiny",
 *                 "price": 200,
 *                 "quantity": 4,
 *                 "favorite": true,
 *             },
 *             "tomato": {
 *                 "color": "yellow",
 *                 "size": "big",
 *                 "price": 340,
 *                 "quantity": 9,
 *                 "favorite": false,
 *             }
 *             ...
 *         },
 *         "lion": {},
 *         ...
 *     },
 *     "Mars": {},
 *     ...
 * }
 */

const MIN_PRICE = 0;
const MAX_PRICE = 10000;
const MIN_QUANTITY = 0;
const MAX_QUANTITY = 100;

const random_price = () => random_int(MIN_PRICE, MAX_PRICE);
const random_quantity = () => random_int(MIN_QUANTITY, MAX_QUANTITY);
const random_bool = () => random_int(0, 10) % 2;

const random_fruit = (fruit, color, size) => {
    const ret = {};
    const name = pick_random(fruit);
    ret['color'] = pick_random(color);
    ret['size'] = pick_random(size);
    ret['price'] = random_price();
    ret['quantity'] = random_quantity();
    ret['favorite'] = random_bool();
    log(name, ret);
}

log(random_fruit(fruit, color, size));

const generate_nested_data = (planet, animal, furit, color, size) => {
    _.go(
    );
};

// generate_nested_data(planet);

module.exports = {};