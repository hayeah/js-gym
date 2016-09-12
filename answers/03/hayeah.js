function asyncReturn(value) {
	return Promise.resolve(value);
}

await(function* () {
	let a = yield asyncReturn(1);
	let b = yield asyncReturn(2);
	let c = yield asyncReturn(3);

	return a + b + c;

}).then(result => {
  console.log(result);
});

function await(fn) {
	let iter = fn();

	return new Promise(resolve => {
		function loop(nextValue = undefined) {
			let { value, done } = iter.next(nextValue);

			if (done) {
				resolve(value);
			} else {
				// assuming value is always a Promise
				value.then(result2 => {
					loop(result2);
				});
			}
		}

		loop();
	});
}

function* makeGen() {
	while(true) {
		let r = yield;
		console.log("r", r);
	}
}

let gen = makeGen();
gen.next(1);
gen.next(2);
gen.next(3);
