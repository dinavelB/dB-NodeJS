const { rejects } = require('assert');
const { resolveSoa } = require('dns');
const fs = require('fs')
const path = require('path')
const filepath = path.join(__dirname, '../Documentation/recordstudent/students.txt')

async function findID(department, studentsid){
    let studentPK = []
    try{
        const file = await fs.promises.readFile(filepath, 'utf8');
        const lines = file.split('\n').filter(Boolean);
        for(let line of lines){
            // line is fullinfo student
            const parts = line.trim().split(/\s{2,}/)
            const studentnum = Number(parts[1])
            const departmentname = (parts[3])
            studentPK.push({studentID: studentnum, department: departmentname, line: line})
        }
    }catch(error){
        console.log(error)
    }

    //obj, check the args
    const student = studentPK.find(student => student.studentID === studentsid && student.department === department);
    console.log(student.line)
}

async function deleteStudent(studentID){
    let students = []
    try{
        const file = await fs.promises.readFile(filepath, "utf8")
        const lines = file.split('\n').filter(Boolean);
        console.log(lines)
        for(let line of lines){

            const parts = line.trim().split(/\s{2,}/);
            console.log(parts)
            const studentNumber = Number(parts[1])
            console.log(studentNumber)
            students.push({studentID : studentNumber, line: line})
        }

        console.log(students)

        const index = students.findIndex(studentinfo => studentinfo.studentID === studentID)
        if(index !== -1){
            students.splice(index, 1)
        }
            //make the new student array into a string so we can writeit back to the file
            const updatedContent = students.map(s => s.line).join('\n');
            //write the file
            const updateFile = await fs.promises.writeFile(filepath, updatedContent, 'utf8');
            console.log("Student deleted successfully");

            return updatedContent;
    } catch(error){
        console.log(error)
    }
}
//how you export is how you import too.
module.exports = {findID, deleteStudent}