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
    const letter = this.media();
    if (letter >= 80) return "A";
    if (letter >= 60.0 && letter <= 79.9) return "B";
    if (letter >= 40.0 && letter <= 59.9) return "C";
    if (letter >= 20.0 && letter <= 39.9) return "D";
    return "F";
  }

  sumaryStudent(): string {
    const media = this.media().toFixed(2);
    const letters = this.lettersNotes();
    return `ID: ${this.id}, Aluno: ${this.name}, Media: ${media}, Nota-Letra:${letters}`;
  }
}

class GradeBook {
  private students: Student[] = [];

  addStudent(name: string) {
    const student = new Student(name);
    this.students.push(student);
    return true;
  }

  removeStudent(id: number): boolean {
    const index = this.students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      return true;
    }
    return false;
  }

  get;
}
