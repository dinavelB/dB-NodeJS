const filesystem = require('fs');
const pathFile = require('path');
const readline = require('readline');

const pathfile = pathFile.join(__dirname, '../Documentation/recordstudent/students.txt')

//creates a variable for readline terminal interacivity
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//helper method, its async because we use callbacks here
async function students(infos){
    return new Promise((resolve) => {
        rl.question(infos, answer => resolve(answer))
    })
}

//method that asks a questions then returns values
async function start(){
    const studentName = await students("Enter the student name: \n");
    const studentID = parseFloat(await students("Enter student ID: \n"));
    const studentCourse = await students("Enter student course: \n");

    return ({studentName, studentID, studentCourse})
}

class Student{
    studentName;
    studentID;
    studentCourse;

    //destructurig here, it will turn into instance
    constructor({studentName, studentID, studentCourse}){
        this.studentName = studentName;
        this.studentID = studentID;
        this.studentCourse = studentCourse;
    }
}

class Records{

    constructor(){
        this.records =   [] //array
    }

    addStudent(student){
        if(typeof student !== 'object') throw "Error";

        this.records.push(student)

        return new Promise((resolve, reject) =>{
            //asynchronous callbacks needs promise
            console.log("======Student Name============Student ID============Student Course======")
            const lineStudents = //this is spacing on the and of each responses
            `${student.studentName.padEnd(30)}` +
            `${String(student.studentID).padEnd(22)}` +
            `${student.studentCourse}\n`;


            //promise, returns a value. only reject or resolve
            //value can be use to other methods or storing
            filesystem.appendFile(pathfile, lineStudents, 'utf8', (error) =>{
                if (error) return reject(error) //practice to return a resoslve or reject

                filesystem.readFile(pathfile, 'utf8', (error, data)=> {
                    if(error) return reject(error)
                        else return resolve(data)
                })
            })
        })
    }
}

//dont forget to call a method when you wrap it :)
async function main(){
    const studentInput = await start();
    const students = new Student(studentInput)
    const bookrecords = new Records()
    

    const fileSystem = await bookrecords.addStudent(students) //addStudent do return a value, its from the file systems
    console.log(fileSystem)
}

main()