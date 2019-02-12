// 1. Создать функцию, которая возвращает промис. Функция принимает два аргумента - время, через которое промис должен выполниться, и значение, с которым промис будет выполнен.
// function promiseCreator(...) {...}
// const prom = promiseCreator(500, 'Ok!');
// prom.then(console.log);
// Ok!

function promiseCreator(delay, value) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(value);
		}, delay);
	});
}

const prom = promiseCreator(2000, 'Ok!');
prom.then(console.log);
console.log(prom);

const prom2 = promiseCreator(1000, 'faster Ok!');
prom2.then(console.log);

console.log('after promise');

// 2. Создать класс, который производит экземпляр со следующими свойствами:
// - promise - промис, который создается во время запуска конструктора;
// - reject - метод, при выполнении которого promise реджектится;
// - resolve - метод, при выполнении которого promise резолвится.
// class Prom {...}
// const inst = new Prom();
// inst.promise.then(data => console.log(data));
// inst.resolve('test');
// → test

class Prom {
	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
}

const inst = new Prom();
inst.promise.then(data => console.log(data));
inst.resolve('test');