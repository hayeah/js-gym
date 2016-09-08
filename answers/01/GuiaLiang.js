function* range(obj) {
	if(Array.isArray(obj)) {
    	for(let i = 0; i < obj.length; i++) {
        	yield [i, obj[i]];
        }
    }else {
    	for(let k of Object.keys(obj)) {
        	yield [k, obj[k]];
        }
    }
}
