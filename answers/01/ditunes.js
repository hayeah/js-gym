// array has internal defined iterator
function rangForMapToArray(input){
    return Object.keys(input).map((key)=>{
        return [key,input[key]]
    });
}


function rangeForGenerator(input){
    function* generator(){
      //array [2,3,4] keys is [0,1,2] and object {"a","b"} keys is ["a"] 
      var inputKeys = Object.keys(input); 
      for(let index in inputKeys){
         var key = inputKeys[index] 
         yield [key, input[key]];
      }
    }
    return generator();
}



function test(input,method){
  for(let [k,v] of method(input)){
    console.log(`${k}`+"=>"+`${v}`);
  } 
}

console.log("------generator----")
test([1,2,5],rangeForGenerator)
test({"ad":"sd"},rangeForGenerator)

console.log("---------array---------")
test([1,2,3,4],rangForMapToArray)
test({"a":"b","c":"d"},rangForMapToArray);