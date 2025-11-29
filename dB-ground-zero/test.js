const util = require('util')
const readline = require('readline')
const { read } = require('fs')
const { stdin, stdout } = require('process')
const { asyncWrapProviders } = require('async_hooks')

const os = require('os')

//For handling cryptographic operations like encryption, decryption, and creating hashes, 
// the crypto module is indispensable. It includes functions for secure data handling and authentication.

const crypto = require('crypto')
const { buffer } = require('stream/consumers')

    const algorithm = "aes-256-cbc"
    //here are the algos
    //"aes-256-cbc" 
    //"aes-256-ctr"
    //"aes-192-cbc"
    //"aes-128-cbc"
 
class Keys{
    encryptdata(text){
         
        const passkey = crypto.createHash("sha256").update("dB020606").digest()//create the num
        const iv = crypto.randomBytes(16) //always 16 the iv

        //encrypt the text
        const code = crypto.createCipheriv(algorithm, passkey, iv) //pass the algorithm, hashing and iv
        const encryption = Buffer.concat([ //concatenations since update and final cant return in one line
            code.update(text, 'utf8'),
            code.final()
        ])

        //create a verification
        //use the passkey!
        const hmacSig = crypto.createHmac("sha256", passkey).update(encryption).digest('hex')

        return {
            iv: iv.toString('hex'),
            data: encryption.toString("hex"),
            signature: hmacSig
        }

        const verify = Buffer.from(encryption)
    }
}
const infoOS = ()=>{
    console.log(os.arch());
    console.log(os.freemem());
    console.log(os.platform())
}

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

    console.log("===========your os is==========")
    infoOS()

    const password = await setQuestions("Enter the password")

    const encryptdata = new Keys()
    const res = encryptdata.encryptdata(password)
    console.log(res)
    rl.close()

}
main()