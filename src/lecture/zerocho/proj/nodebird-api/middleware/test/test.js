const {Router} = require('express');
const log = console.log;

const router = Router();

router.post('/json', (req, res, next) => {
    const {name, age, married, money} = req.body;
    const message = `name=|${name}|, age=|${age}|, married=|${married}|, money=|${money}|`;
    res.json({message});
});

router.post('/text', (req, res, next) => {
    const message = req.body;
    res.send(message);
});

router.route('/:name')
    .get((req, res, next) => {
        const {name} = req.params;
        const {age} = req.query;
        res.send(`<h1>hi ${name}, you are ${age} years old. is it right?</h1>`)
    })
    .post((req, res, next) => {
        const {name} = req.params;
        const {age} = req.query;
        const {married} = req.body;
        log(`typeof married=|${typeof married}|`);
        res.send(`<h1>name=${name}, age=${age}, married=${married}</h1>`);
    });

module.exports = router;
