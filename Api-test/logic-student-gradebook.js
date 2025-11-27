function findID(departname, studentsid){
    //this is otuside of a class anymore so dont use the this keyword.
    //make it globally accepted not wrapped
    const student = departname.find(student => student.studentID === studentsid);
    return student;
}

module.exports = findID