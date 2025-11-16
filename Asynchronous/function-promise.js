class Coffee{
    coffeeName;
    coffeePrice;
    coffeeTax;

    constructor(coffeename, coffeeprice){
        this.coffeeName = coffeename;
        this.coffeePrice = coffeeprice
    }
}

class Menu{
    
    constructor(){
        this.menu = []
    }

    async addCoffee(coffeeInfo){

        //throw becomes reject auto cus this async returns a value
        if(coffeeInfo.coffeePrice < 0) throw "cant add the coffee"

        //delaying async for 3secs
        //setTimeout can be only solely function i wrap in promise keyword
        await new Promise(res => setTimeout(res, 3000));

        //no need for promise keyword if methods return a value, if not need a promise
        return({coffee: coffeeInfo, message: `${coffeeInfo.coffeeName} added successfully`})
    }

    //desctructure to use values individually must match keys
    successAddingCoffee({coffee, message}){
        this.menu.push(coffee)

        console.log("current menu:")

        for(let coffees of this.menu){
            
            console.log(`Coffee name: ${coffees.coffeeName}, Coffee price: ${coffees.coffeePrice}`)
        }
        console.log(message)

        console.log("=======================")
    }

}

(async ()=> {
    const menu = new Menu()

    //you can return a bunch of values thru wrapping ex. obj and array
    //array of an objects
    const coffees = [
        new Coffee("machiatto", 200),
        new Coffee("black coffee", 20),
        new Coffee("Latte", 300)
    ]

    try{
        for (let c of coffees){
            let result = await menu.addCoffee(c)
            menu.successAddingCoffee(result)
        }
    } catch(err){
        console.log('error at', err)
    }
})()