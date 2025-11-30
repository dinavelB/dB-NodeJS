

const helper = (questions) =>{
    return new Promise(resolve =>{
        rl.question(questions, answer =>{
            resolve(answer)
        })
    })
}
function add(a, b){
    return a + b
}

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const assert = require('assert')
const { read } = require('fs')

async function main(){
    const number = Number(await helper("Enter the number"));
    const numebr2 = Number(await helper("Enter the second number"));

    const result = add(number, numebr2)
    assert(result, number + numebr2, "this is valid")
}

main()