import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
    
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) { }

    async findAll() { 
        return await this.courseRepository.find({relations: ['tags']});
    }
    
    async findOne(id: any) { 
        const course = await this.courseRepository.find({where: {id: id}, relations: ['tags']});
        
        if (!course) { 
            throw new NotFoundException(`Course id ${id} not found`);
        }

        return course;
    }

    async create(createCourseDto: CreateCourseDto) { 
        const tags = await Promise.all(
            createCourseDto.tags.map((name: string)=> this.preloadTagByName(name)),            
        );

        const course = this.courseRepository.create({
            ... createCourseDto,
            tags,
        });

        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {

        const tags = updateCourseDto.tags && (
            await Promise.all(
                updateCourseDto.tags.map((name: string)=> this.preloadTagByName(name))
            )
        );

        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
            tags
        });
    
        if(!course) { 
        throw new NotFoundException(`Course id ${id} not found`);
        }
    
        return this.courseRepository.save(course);
    }

    async remove(id: any) {
        const course = await this.courseRepository.findOneBy({id: id});

        if(!course) { 
            throw new NotFoundException(`Course id ${id} not found`);
        }
        
        return this.courseRepository.remove(course);
    }
    
    private async preloadTagByName(name: string): Promise<Tag> { 
        const tag = await this.tagRepository.findOneBy({name: name});
        
        if(tag) { 
            return tag;
        }

        return this.tagRepository.create({name: name});
    }
}
