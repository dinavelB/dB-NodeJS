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

    addCoffee(coffeeInfo){
        return new Promise((Successs, error) =>{
            //you can add some validations here because thats what promise needs.
            // here determines what value are being passed down to the params of then and catch. by the parameter being
            //declared on promise ex. success and error
            setTimeout(() =>{

                if(coffeeInfo.coffeePrice > 0){
                //holds a value later to be used on then
                //iif u want to pass multiple, access it by object
                Successs({coffee: coffeeInfo, msg: "coffee added succesfully"});

            } else{
                //and catch
                error("Invalid price")
            }
            }, 3000)
            
        })//you cant delay in promsie syntax wrap it instead on the setTimeout()
    }

    successAddingCoffee(coffee, msg){
        this.menu.push(coffee)

        for(let coffees of this.menu){
            console.log(`Coffee name: ${coffees.coffeeName}, Coffee price: ${coffees.coffeePrice}`)
        }

        console.log(msg)
    }

    fail(error){
        console.log("failed to add coffee", error)
    }

}

const coffee = new Coffee("Machiato", 200);
const menu = new Menu()
menu.addCoffee(coffee)
//params here are from the success and error
//takes only one param
.then((coffee) => menu.successAddingCoffee(coffee.coffee, coffee.msg))
.catch((error) => menu.fail(error))