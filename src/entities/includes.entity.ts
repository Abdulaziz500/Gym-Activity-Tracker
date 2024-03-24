import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Workout } from './workout.entity';
import { Exercise } from './exercise.entity';
import { Sets } from './sets.entity';

@Entity("includes")
export class Includes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Workout, workout => workout.includes)
    workout!: Workout;

    @ManyToOne(() => Exercise, exercise => exercise.includes)
    exercise!: Exercise;

    @OneToMany(() => Sets, sets => sets.includes)
    sets!: Sets[];
}
