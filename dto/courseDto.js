class CourseDto {

    constructor(course) {
        this.id = course.id,
            this.cname = course.cname,
            this.duration = course.duration,
            this.fees = course.fees,
            this.shortName = course.shortName
    }

}

module.export = CourseDto;