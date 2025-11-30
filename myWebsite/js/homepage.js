
const methods = {
    sendData: async (event)=>{
        event.preventDefault()

        const data = {
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value
        }

        const response = await fetch('https://localhost:8080/submitresponse', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        })
        const res = await response.json()
        console.log(res)
    }
}

document.getElementById('personData').addEventListener('submit', methods.sendData)