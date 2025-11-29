const util = require('util')
const readline = require('readline')
const { read } = require('fs')
const { stdin, stdout } = require('process')
const { asyncWrapProviders } = require('async_hooks')

const rl = readline.createInterface({
    input: process.stdin,
     output: process.stdout
})

const setQuestions = (question)=>{
    return new Promise((resolve)=>{
        rl.question(question, answer=>
            resolve(answer))
    })
}

async function main(){
    const name = await setQuestions("Enter your name:\n")
    const print = util.format("Hello, %s! Welcome to NodeJS", name)
    console.log(print)
}
main()