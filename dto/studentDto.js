class StudentDto {
    constructor(student) {
        this.id = student.id,
            this.fname = student.fname,
            this.lname = student.lname,
            this.contact = student.contact,
            this.email = student.email
    }
}


module.exports = StudentDto;