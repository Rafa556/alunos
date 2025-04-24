class Student {
  readonly id: number;
  name: string;
  notes: number[] = [];
  nextStudent = 1;

  constructor(name: string) {
    this.name = name;
    this.id = this.nextStudent++;
  }

  notesStudent(note: number): void {
    if (note >= 0 && note <= 100) {
      this.notes.push(note);
    } else {
      throw new Error("Nota deve ser entre 0 e 100");
    }
  }

  media(): number {
    if (this.notes.length === 0) {
      return 0;
    }
    const sum = this.notes.reduce((acc, value) => acc + value, 0);
    return sum / this.notes.length;
  }

  lettersNotes(): string {
    const media = this.media();
    if (media >= 80) return "A";
    if (media >= 60.0 && media <= 79.9) return "B";
    if (media >= 40.0 && media <= 59.9) return "C";
    if (media >= 20.0 && media <= 39.9) return "D";
    return "F";
  }

  sumaryStudent(): string {
    const media = this.media().toFixed(2);
    const letter = this.lettersNotes();
    return `ID: ${this.id}, Aluno: ${this.name}, Media: ${media}, Nota-Letra:${letter}`;
  }
}

class GradeBook {
  private students: Student[] = [];

  addStudent(name: string): Student {
    const student = new Student(name);
    this.students.push(student);
    return student;
  }

  removeStudent(id: number): boolean {
    const index = this.students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      return true;
    }
    return false;
  }

  addNoteToStudent(id: number, note: number): boolean {
    const index = this.students.findIndex((student) => student.id === id);
    if (index !== -1) {
      const student = this.students[index];
      student.notesStudent(note);
      return true;
    } else {
      return false;
    }
  }

  private unnaccent(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  searchStudentByName(keyword: string) {
    const student = this.students.find((student) =>
      this.unnaccent(student.name.toLowerCase().trim()).includes(
        this.unnaccent(keyword.toLowerCase().trim())
      )
    );
    if (!student) {
      return undefined;
    }
    return student;
  }

  getStudentsMedia() {
    const studentsMedia = this.students.reduce(
      (acc, student) => (acc += student.media()),
      0
    );
    const totalStudents = this.students.length;
    return (studentsMedia / totalStudents).toFixed(2);
  }

  getStudentsLetterNotes() {
    const studentsLetterNotes = this.students.reduce(
      (acc, student) => {
        acc[student.lettersNotes()] = acc[student.lettersNotes()] + 1;
        return acc;
      },
      {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        F: 0,
      }
    );

    return studentsLetterNotes;
  }

  getBestStudentNotes(limit: number) {
    const ordered = this.students.sort((currentStudent, nextStudent) => {
      return currentStudent.media() - nextStudent.media();
    });
    return ordered.slice(0, limit);
  }

  summaryGradeBook() {
    const totalStudents = this.students.length;
    const studentsMedia = this.getStudentsMedia();
    const studentsLetterNotes = this.getStudentsLetterNotes();
    return `Total de alunos: ${totalStudents}.\nMédia geral: ${studentsMedia}.\nMediana: NÃO FEITO.\nDistribuição de letras:\n${Object.entries(
      studentsLetterNotes
    )
      .map(([letter, note]) => `${letter}: ${note}`)
      .join("\n")}`;
  }
}

const gradeBook = new GradeBook();
const student1 = gradeBook.addStudent("Ana");
gradeBook.addNoteToStudent(student1.id, 50);
gradeBook.addNoteToStudent(student1.id, 60);

const student2 = gradeBook.addStudent("Bruno");
gradeBook.addNoteToStudent(student2.id, 50);
gradeBook.addNoteToStudent(student2.id, 60);

const student3 = gradeBook.addStudent("Carla");
gradeBook.addNoteToStudent(student3.id, 60);
gradeBook.addNoteToStudent(student3.id, 60);

const student4 = gradeBook.addStudent("Diego");
gradeBook.addNoteToStudent(student4.id, 60);
gradeBook.addNoteToStudent(student4.id, 60);

const student5 = gradeBook.addStudent("Eva");
gradeBook.addNoteToStudent(student5.id, 60);
gradeBook.addNoteToStudent(student5.id, 60);

console.log(gradeBook.summaryGradeBook());
