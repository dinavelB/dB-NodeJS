const crypto = require('crypto')
const readline = require('readline')
const bcrypt = require('bcrypt')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
    //here are the algos
    //"aes-256-cbc" 
    //"aes-256-ctr"
    //"aes-192-cbc"
    //"aes-128-cbc"

const helper = async(question) =>{
    return new Promise((resolve)=>{
        rl.question(question, answer => resolve(answer))
    })
}
function hidePassword(pass){
    const passkey = crypto.createHash("sha256").update("dB020606").digest();
    const iv = crypto.randomBytes(16)
    const encrypt = crypto.createCipheriv("aes-256-cbc", passkey, iv)

    const encryptdata = Buffer.concat([
        encrypt.update(pass, 'utf8'),
        encrypt.final()
    ])

    const hmacKey = crypto.createHmac("sha256", passkey).update(encryptdata).digest("hex")

    return ({
        iv: iv.toString("hex"),
        data: encryptdata.toString("hex"),
        signature: hmacKey
    })
}

const checkpassword = async (password, reenter)=>{
    let passwords  = []

    password = await helper("Enter your password\n")
    reenter = await helper("Reenter your password\n")
    //const salt = crypto.randomBytes(16)

    const thepass = await bcrypt.hash(password, 12);
    const repass = await bcrypt.compare(reenter, thepass)
    
    if(!repass){
        console.log("password do not match")
    } else {
        passwords.push(password)
        const res = hidePassword(thepass)
        console.log(res)
    }
}

checkpassword()
