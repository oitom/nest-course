import { type } from "os";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from './tag.entity';

@Entity('courses')
export class Course { 
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @ManyToMany(() => Tag, (tag: Tag) => tag.courses, { cascade: true })
   
    @JoinTable()
    tags: Tag[];
}