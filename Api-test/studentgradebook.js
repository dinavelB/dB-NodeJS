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
    const studentID = Number(await students("Enter student ID: \n"));
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
    async decision(){
        //you dont need a promise if your calling an another function promise via await,
        //because await only works at async fucntion only, not under the promise or etc. just async func.
        const answer = Number(await students("type 1 to add students, type 2 to see lists\n"))
            if(answer === 1){
                //since addstudent need a value, create an instance of student.
                const studentInfo = await start();
                const student = new Student(studentInfo);
                return await this.addStudent(student)
            } else if(answer === 2){
                return await this.readFile()
            } else{
                //its nice to throw and error object than throw itself only.
                //cause, This gives a proper stack trace and is standard.
                throw new Error("must be only a 1 and 2 numbers.")
            }
            
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

    async readFile(){
        //use standardize naming convention in promise
        return new Promise((resolve,reject) =>{
            filesystem.readFile(pathfile, 'utf8', (error, data) =>{
                if(error) return reject(error)

                resolve(data)
            })
        })
    }

    displayStudents(){
        for (let student of this.records){
            console.log(student)
        }
    }
}

//dont forget to call a method when you wrap it :)
async function main(){
    const bookrecords = new Records()
    const students = await bookrecords.decision();
    console.log(students)
    rl.close();
}

main()