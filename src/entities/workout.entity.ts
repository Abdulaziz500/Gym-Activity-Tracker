import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Trainee } from './trainee.entity';
import { Includes } from './includes.entity';
import { Coach } from './coach.entity';

@Entity("workout")
export class Workout extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:false})
    name!: string;

    @Column()
    duration!: number;

    @ManyToOne(() => Trainee, trainee => trainee.workouts)
    trainee!: Trainee;

    @ManyToOne(() => Coach, coach => coach.workouts)
    coach!: Coach;

    @OneToMany(() => Includes, includes => includes.workout)
    includes!: Includes[];
}
