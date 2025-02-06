const fs = require('fs');

setTimeout(() => console.log('Timer 1 é executado primeiro pois callbacks com timer expirado são resolvidos na primeira fase do loop de eventos'), 0); //2
setImmediate(() => console.log("Immediate 1 é executado na fase check do loop de eventos")); //5

fs.readFile("test-file.txt", () => {
    console.log("I/O callback é executado pois a fase de I/O Poll ocorre logo após a fase de timers"); //3
    console.log("---------------");

    setTimeout(() => console.log('Timer 2 é executado somente no próximo ciclo do loop de eventos, pois como foi definido dentro de um I/O callback, sua fase de execução já foi encerrada e ele precisará aguardar o próximo ciclo'), 0); //7
    setTimeout(() => console.log('Timer 3 é executado após o Timer 2 tanto por possuir um temporizador maior quanto por ter sido definido posteriormente'), 3000); //8
    setImmediate(() => console.log("Immediate 2 é executado imediatamente após a fase de I/O, pois pertence à fase check")); //6

    process.nextTick(() => console.log("Process.nextTick é executado antes de qualquer outra fase do Event Loop após a execução do callback atual, dando prioridade sobre setImmediate")) //4
});

console.log("É rodado primeiro pois top-level code é executado imediatamente antes de qualquer operação assíncrona do Node.js"); //1
