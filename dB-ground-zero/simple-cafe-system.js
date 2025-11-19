const { METHODS } = require('http');
const { off } = require('process');
const readLine = require('readline')

const rl = readLine.createInterface({
    input:process.stdin,
    output: process.stdout
})

// add a helper method
function coffeeInfo(question){
    return new Promise((resolve) =>{ //no reject cuz we dont need it on this logic
        rl.question(question, answer => resolve(answer))
    })
}

async function start(){
    const coffeeName = await coffeeInfo("Enter the coffee name")
    const coffeePrice = await coffeeInfo("Enter the coffee price")
    const coffeeQuantity = await coffeeInfo ('Enter the coffee quantity')
    
    return ({coffeeName, coffeePrice, coffeeQuantity})
}


class Coffee {
    coffeeName;
    coffeePrice;
    coffeeQuantity;

    constructor({coffeeName, coffeePrice, coffeeQuantity}){
        this.coffeeName = coffeeName;
        this.coffeePrice = coffeePrice;
        this.coffeeQuantity = coffeeQuantity; 
    }
}

class Menu{
    constructor(){
        this.menu = []
    }

    async addCoffee(offeeObj){
        if(typeof offeeObj !== 'object' || offeeObj === null){
            throw "Invalid Coffee"
        }

        this.menu.push({
            coffeeName: offeeObj.coffeeName,
            coffeePrice: offeeObj.coffeePrice,
            coffeeQuantity: offeeObj.coffeeQuantity
        })

        return this.menu
    }

    displayMenu(){
        //no object or array passed down to this method, use the global since its where we store the object
        for(let coffee of this.menu){
            
            console.log(`Coffee Name: ${coffee.coffeeName}, Coffee Price: ${coffee.coffeePrice}, Coffee Quantity: ${coffee.coffeeQuantity}`)
        }
    }
        
}

(async ()=> {
    try{
        const answeCoffee  = await start()
        const coffee = new Coffee(answeCoffee)
        const menu = new Menu()
        await menu.addCoffee(coffee)
        rl.close()
    }
    catch(err){
        console.log('error at:', err)
        rl.close()
    }
})() 