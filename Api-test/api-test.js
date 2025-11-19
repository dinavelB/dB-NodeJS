async function getFile(){
    //doesnt return a value. create promise.
    const promise =  new Promise((resolve, reject) =>{

    //creates a request
    let req = new XMLHttpRequest();

    //gets a file thru open() 
    req.open('GET', "mycar.html");

    //loads the file if standards met
    req.onload(() =>{
    
        if (req.status == 200) {
        resolve(req.response);
      } else {
        reject("File not Found");
      }
    })
    req.send()
    })

    document.getElementById("demo_ignore").innerHTML = await promise

    return await promise

}
(async() => {
    try{
        const result = await getFile()
        console.log(result)
    } catch(err){
        console.log('error at', err)
    }
})()



async function getFile() {
  let myPromise = new Promise(function(resolve) {
    let req = new XMLHttpRequest();
    req.open('GET', "mycar.html");
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        resolve("File not Found");
      }
    };
    req.send();
  });
  document.getElementById("demo").innerHTML = await myPromise;
}