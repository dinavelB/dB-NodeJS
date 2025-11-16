//async keyword makes a method or function return a promise
//callback is a function passed to another method or function.

async function myFirstAsync(input){
    //await can be onnly use inside of a async func/method
    //await means let the promise run first before continuing the logic
    if(!input) throw "Invalid"

    //delay
    await new Promise(res => setTimeout(res, 3000))

    //what you return is the resolve promise
    return{input, message: "success"}
}

(async ()=>{
    

    try{
        const res = await myFirstAsync("hello")
        console.log(res)
    }
    catch(err){
        console.log('error at', err )
    }
})();


//same as
function myFunction() {
  return Promise.resolve("Hello");
}