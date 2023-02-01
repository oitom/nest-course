import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: 'Fundamento do framework NestJs',
            description: 'Fundamento do framework NestJs',
            tags: ['node.js', 'nestjs', 'javascript']
        }
    ];

    findAll() { 
        return this.courses;
    }
    
    findOne(id: string) { 
        const course = this.courses.find((couse: Course) => couse.id == Number(id));
        
        if (!course) { 
            throw new HttpException(`Couse id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return course;
    }

    create(createCourseDto: any) { 
        this.courses.push(createCourseDto);
        return createCourseDto;
    }

    update(id: string, updateCourseDto: any) {
        const indexCourse = this.courses.findIndex((course: Course)=> course.id == Number(id));        
        this.courses[indexCourse] = updateCourseDto;
        console.log(indexCourse);
        console.log(this.courses[indexCourse]);
        
        return this.courses[indexCourse];
    }

    remove(id: string) { 
        const indexCourse = this.courses.findIndex((course: Course)=> course.id == Number(id));
        
        console.log(indexCourse);

        if(indexCourse >= 0) {
            this.courses.splice(indexCourse, 1);
        }
    }

}
