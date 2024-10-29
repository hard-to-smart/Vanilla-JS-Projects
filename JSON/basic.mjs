import { universityData } from "./university-data.mjs";
let StudentArray= [];
let Schedules = [];
let Faculty = [];
function ques1(){
    universityData.departments.forEach((department) => {
        department.courses.forEach((course)=>{
            course.students.forEach((student)=>{
                const {studentId, name, grades} = student;
                const assignmentsTotal = (grades.assignments.reduce((acc, val) => acc + val, 0))/grades.assignments.length;
                const assignmentsMarks = (assignmentsTotal/100) * 40;
                const midterm = (grades.midterm /100) * 30;
                const final = (grades.final/100) * 30;
                const cgpa = (assignmentsMarks + midterm + final) /20
                StudentArray.push({id: studentId, name: name, gpa: cgpa});
            })
        })
    })
}

ques1(StudentArray)
console.log(StudentArray)


/// question 2

function ques2(Schedules){
    universityData.departments.forEach((department)=>{
        department.courses.forEach((course)=>{
            const {courseId, title, credits, schedule} = course;
            Schedules.push({courseId, title, credits, schedule})
        })
    })
}


ques2(Schedules);
console.log(Schedules)

/// question 3

function ques3(Faculty){
    universityData.departments.forEach((department)=>{
        const {id, name, head} = department;
        Faculty.push({departmentName: name, departmentId: id, faculty: head})
    })
}
ques3(Faculty);
console.log(Faculty)