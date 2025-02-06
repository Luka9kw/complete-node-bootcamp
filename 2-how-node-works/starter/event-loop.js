const fs = require('fs');
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => console.log('Timer 1'), 0); //2
setImmediate(() => console.log("Immediate 1")); //5

fs.readFile("test-file.txt", () => {
    console.log("I/O callback"); //3
    console.log("---------------");

    setTimeout(() => console.log('Timer 2'), 0); //7
    setTimeout(() => console.log('Timer 3 '), 3000); //8
    setImmediate(() => console.log("Immediate 2 ")); //6

    process.nextTick(() => console.log("Process.nextTick")) //4

    crypto.pbkdf2('password', 'salt', 1000000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    })
    crypto.pbkdf2('password', 'salt', 1000000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    })
    crypto.pbkdf2('password', 'salt', 1000000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encrypted")
    })

});

console.log("top-level code"); //1
