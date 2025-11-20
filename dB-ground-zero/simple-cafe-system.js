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
                                    //this is a callback asynchronous therefore use promise.
        rl.question(question, answer => resolve(answer))
    })
}

async function start(){
    const coffeeName = await coffeeInfo("Enter the coffee name")
    const coffeePrice = parseFloat(await coffeeInfo("Enter the coffee price"))//same here
    const coffeeQuantity = parseFloat(await coffeeInfo ('Enter the coffee quantity')) //convert to nums
    
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

    addCoffee(offeeObj){
        if(typeof offeeObj !== 'object' || offeeObj === null){
            throw "Invalid Coffee"
        }

        this.menu.push((offeeObj))// i have already an instance, the class coffee. dont need to push one  y one with new keys.

    }

    displayMenu(){
        //no object or array passed down to this method, use the global since its where we store the object
        for(let coffee of this.menu){
            
            console.log(`Coffee Name: ${coffee.coffeeName}, Coffee Price: ${coffee.coffeePrice}, Coffee Quantity: ${coffee.coffeeQuantity}`)
        }
    }
        
}

async function mainProgram(){
    let addMore = true;
    const menu = new Menu()
        try{
            while(addMore){
                const answeCoffee  = await start()
                const coffee = new Coffee(answeCoffee)
                menu.addCoffee(coffee)

                const ques = await coffeeInfo("Want to add more coffee? yes/no")
                if(ques.toLowerCase() !== 'yes') addMore = false; /// methods can be used on args
                
            }
                menu.displayMenu()
                rl.close()
        }
        catch(err){
            console.log('error at:', err)
            rl.close()
        }
    }

    mainProgram()
   