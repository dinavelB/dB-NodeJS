    const filesystem = require('fs');
    const pathFile = require('path');
    const readline = require('readline');
    const findID = require('./logic-student-gradebook')

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
    async function start(records){
        const studentName = await students("Enter the student name: \n");
        //return value is resolve(answer) 
                let existingID = []
                try{
                    const data = await filesystem.promises.readFile(pathfile, 'utf8');
                    const lines = data.split('\n').filter(Boolean);
                    for(let line of lines){

                        const parts = line.trim().split(/\s+/); // split by whitespace
                        const id = Number(parts[1]); // assuming second column is studentID
                        existingID.push(id);

                    }
                } 
                catch(error){
                    console.log('error at', error)
                }     
                
                let studentID;
                let isDuplicated;
                let isInFile;
                do{
                    studentID = Number(await students("Enter the student ID:\n"))
                    isDuplicated = records.some(student => student.studentID === studentID);
                    isInFile = existingID.includes(studentID);

                    if(isDuplicated || isInFile){
                        console.log('Student already exists!')
                    }

                } while(isDuplicated || isInFile)

        const studentCourse = await students("Enter student course: \n");
        const departmentname = await students("Enter student departments: \n");

        return ({studentName, studentID, studentCourse, departmentname})
    }

    class Student{
        department;
        studentName;
        studentID;
        studentCourse;

        //destructurig here, it will turn into instance
        constructor({studentName, studentID, studentCourse, departmentname}){
            this.studentName = studentName;
            this.studentID = studentID;
            this.studentCourse = studentCourse;
            this.department = departmentname;
        }
    }

    class Records{

        constructor(){
            this.records =   [] //array
        }
        async decision(){
            console.log("==============================MAIN MENU===============================")
            console.log("1.Add Student\n2.See students\n3.Find Student")
            const answer = Number(await students("Enter the Number: "))

                if(answer === 1){
                    const studentInfo = await start(this.records);
                    const student = new Student(studentInfo);
                    return await this.addStudent(student)   
                } else if(answer === 2){
                    return await this.readFile()
                } else if(answer === 3){
                    const dpName = await students("Enter the department name:\n")
                    const studentID = await students("Enter students ID:\n")

                    //filter the array
                    const department = this.records.filter(department => department.department === dpName)
                    const findstudentID = findID(department, studentID)
                    console.log(findstudentID);
                }
                
        }    
        addStudent(newStudent){
            if(typeof newStudent !== 'object') throw "Error";
                
                this.records.push(newStudent)

                return new Promise((resolve, reject) =>{
                //asynchronous callbacks needs promise
                console.log("======Student Name============Student ID============Student Course======")
                const lineStudents = //this is spacing on the and of each responses
                `${newStudent.studentName.padEnd(30)}` +
                `${String(newStudent.studentID).padEnd(22)}` +
                `${newStudent.studentCourse}\n`;


                //promise, returns a value. only reject or resolve
                //value can be use to other methods or storing
                //pass the object to appendfile
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
        const file = await bookrecords.decision();
        console.log(file)

        bookrecords.displayStudents()
        rl.close();
    }

    main()