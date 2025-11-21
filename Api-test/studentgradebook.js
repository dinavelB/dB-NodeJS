const filesystem = require('fs');
const pathFile = require('path');
const readline = require('readline');

const pathfile = pathFile.join(__dirname, '../Documentation/recordstudent/students.txt')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function students(infos){
    return new Promise((resolve) => {
        rl.question(infos, answer => resolve(answer))
    })
}

async function start(){
    const studentName = await students("Enter the student name");
    const studentID = parseFloat(await students("Enter student ID"));
    const studentCourse = await students("Enter student course");

    return ({studentName, studentID, studentCourse})
}

class Student{
    studentName;
    studentID;
    studentCourse;

    constructor({studentName, studentID, studentCourse}){
        this.studentName = studentName;
        this.studentID = studentID;
        this.studentCourse = studentCourse;
    }
}

class Records{

    constructor(){
        this.records =   []
    }

    addStudent(student){
        if(typeof student !== 'object') throw "Error";

        return new Promise((resolve, reject) =>{

            const lineStudents = `${student.studentName} ${student.studentID}, ${student.studentCourse}\n`

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
