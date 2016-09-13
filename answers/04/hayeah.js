// Map from object to MethodCallbacks.
// Map(Object, MethodCallbacks)
// type MethodCallbacks = Map(string, Set(Callback))
var $readerGraph = new Map();
var $autorunFn;

function autorun(fn) {
	$autorunFn = fn;
	fn();
	// console.log($readerGraph);
	$autorunFn = undefined;
}

// use Set to track list of callback
// Map(Object) -> Map(string) -> Set(callback)
function observable(o) {
	let proxy = new Proxy(o, {
		get(target, property) {
			// If we are tracking autorun reader, this global function will be set.
			if ($autorunFn != null) {
				let methodSubscribers = $readerGraph.get(target)
				if(methodSubscribers == null) {
					methodSubscribers = new Map();
					$readerGraph.set(target, methodSubscribers);
				}

				let subscribers = methodSubscribers.get(property);
				if (subscribers == null) {
					subscribers = new Set();
					methodSubscribers.set(property, subscribers);
				}

				subscribers.add($autorunFn)
			}
			return Reflect.get(target, property);
		},

		set(target, property, value) {
			Reflect.set(target, property, value);

			let methodSubscribers = $readerGraph.get(target)
			if (methodSubscribers) {
				let subscribers = methodSubscribers.get(property);
				if (subscribers) {
					subscribers.forEach(subscriber => subscriber());
				}
			}
		}
	});

	return proxy;
}



let o = observable({
	a: 1,
});

let o2 = observable({
	b: 2,
});

// 可以直接读取对象的属性
console.log(o.a);
// 1
console.log(o2.b);
// 2

// autorun 会先运行一次回调，分析可观察对象那些属性有被引用。
// o 是个可观察对象，每次 o.a 更改都要重新运行一次回调。
autorun(() => {
	// 回调 1 - o.a 有改动
	console.log(`a => ${o.a}`)
});

// o2 是个可观察对象，每次 o2.b 更改都要重新运行一次回调。
autorun(() => {
	// 回调 2 - o2.b 有改动
	console.log(`b => ${o2.b}`)
});


// 每次 o.a 或者 o2.b 更改都要重新运行一次回调。
autorun(() => {
	// 回调 3 - o.a 或者 o2.b 有改动
	console.log(`a + b => ${o.a + o2.b}`)
});

// 会触发回调 1, 2
o.a = 100;

// 会触发回调 2，3
o2.b = 200;