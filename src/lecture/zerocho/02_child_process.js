const {exec, spawn} = require('child_process');
const log = console.log;

const f1 = () => {
    const proc_ls = exec('ls -al');
    proc_ls.stdout.on('data', data => log(data));
    proc_ls.stderr.on('data', data => log(data));
    proc_ls.on('close', code => log(code));
};

const f2 = () => {
    const proc_ls = spawn('./hello', ['june1', 48, true]);
    proc_ls.stdout.on('data', data => log(data.toString()));
    proc_ls.stderr.on('data', data => log(data.toString()));
    proc_ls.on('close', code => log(code));
};

// f1();
f2();

