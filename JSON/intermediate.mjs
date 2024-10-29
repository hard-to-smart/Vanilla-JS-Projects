import { universityData } from "./university-data.mjs";

let AverageGrade = [];
function inter1(AverageGrade) {
  universityData.departments.forEach((department) => {
    department.courses.forEach((course) => {
      const { courseId, title, students } = course;
      const studentCount = students.length;
      const studentGrades = studentMarks(students);
      console.log(studentGrades);
      const assTotal =
        studentGrades.reduce((acc, obj) => acc + obj.ass, 0) /
        studentGrades.length;
      const midTotal =
        studentGrades.reduce((acc, obj) => acc + obj.mid, 0) /
        studentGrades.length;
      const finTotal =
        studentGrades.reduce((acc, obj) => acc + obj.fin, 0) /
        studentGrades.length;
      const overTotal = studentGrades.reduce((acc, obj) => acc + obj.over, 0);
      AverageGrade.push({
        courseId,
        courseName: title,
        totalStudents: studentCount,
        averages: {
          assignments: assTotal,
          midterm: midTotal,
          final: finTotal,
          overall: overTotal,
        },
        gradeDistribution: {
          A: checkGrade(studentGrades, 'A'),
          B: checkGrade(studentGrades, 'B'),
          C: checkGrade(studentGrades, 'C'),
          D: checkGrade(studentGrades, 'D'),
          F: checkGrade(studentGrades, 'F'),
        },
      });
    });
  });
}

function studentMarks(students) {
  return students.map((student) => {
    const assignmentsTotal =
      student.grades.assignments.reduce((acc, val) => acc + val, 0) /
      student.grades.assignments.length;
    return {
      ass: assignmentsTotal,
      mid: student.grades.midterm,
      fin: student.grades.final,
      over:
        assignmentsTotal * 0.4 +
        student.grades.midterm * 0.3 +
        student.grades.final * 0.3,
      grade: gradeCalculator(
        assignmentsTotal * 0.4 +
          student.grades.midterm * 0.3 +
          student.grades.final * 0.3
      ),
    };
  });
}

function gradeCalculator(overall) {
  switch (true) {
    case overall >= 90:
      return "A";
    case overall >= 80:
      return "B";
    case overall >= 70:
      return "C";
    case overall >= 60:
      return "D";
    default:
      return "F";
  }
}

function checkGrade(studentGrades, gradeVal){
	return(studentGrades.reduce((acc, obj)=> obj.grade.match(gradeVal)? acc + 1 : 0, 0))
}

inter1(AverageGrade);
console.log(AverageGrade);
gradeCalculator(70.5);
