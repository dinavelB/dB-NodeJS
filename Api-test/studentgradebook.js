    const filesystem = require('fs');
    const pathFile = require('path');
    const readline = require('readline');
    const {findID, deleteStudent} = require('./logic-student-gradebook')

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
                    //split method, turning strings into array to strings sample("hello World") to ["hello", "world"]
                    //split(condition wehre to split ends)
                    const lines = data.split('\n').filter(Boolean);
                    for(let line of lines){

                        ///\s+/ means one or more spaces will be split
                        //this will turn in to array of separated strings.
                        const parts = line.trim().split(/\s{2,}/); // split by whitespace
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
            let repeat = true
            const decide = Number(await students("enter 1 to start, enter 2 to exit\n"))
            do{

                if(decide === 1){
                    console.log("==============================MAIN MENU===============================")
                    console.log("1.Add Student\n2.See students\n3.Find Student\n4.Delete Student\n5. Exit")
                    const answer = Number(await students("Enter the Number: "))

                        const stateActions = {
                                1: async() => {
                                    const studentInfo = await start(this.records);
                                    const student = new Student(studentInfo);
                                    const data =  await this.addStudent(student)
                                    console.log(data)   
                                },
                                2: ()=>{
                                    return new Promise(resolve =>{
                                        setTimeout(async ()=>{
                                            const readfile = await this.readFile()
                                            console.log(readfile) 
                                            resolve(readfile)  
                                        }, 2000)
                                    })
                                },
                                3: async () =>{
            
                                    const dpName = await students("Enter the department name:\n")
                                    const studentID = Number(await students("Enter students ID:\n"))

                                    const findstudentID = await findID(dpName, studentID)
                                    console.log(findstudentID);
                                },
                                4: async () =>{
                                    const sID = Number(await students("Enter the student's ID you want to delete.\n"))
                                    const remaining = await deleteStudent(sID)
                                    console.log(remaining)
                                }
                            }  
                
                            const actions = stateActions[answer]
                            //remember bracket, its a key. 
                            if(actions) {
                                await actions()
                            } else {
                                repeat = false
                            }
                }
            }while(repeat)
        }

        addStudent(newStudent){
            if(typeof newStudent !== 'object') throw "Error";
                
                this.records.push(newStudent)

                return new Promise((resolve, reject) =>{
                //asynchronous callbacks needs promise
                console.log("======Student Name============Student ID============Student Course==========Department=============")
                const lineStudents = //this is spacing on the and of each responses
                `${newStudent.studentName.padEnd(30)}` +
                `${String(newStudent.studentID).padEnd(22)}` +
                `${newStudent.studentCourse.padEnd(22)}` +
                `${newStudent.department}\n`;


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
                console.log("======Student Name============Student ID============Student Course==========Department=============")
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
        await bookrecords.decision()
        rl.close();
    }

    main()