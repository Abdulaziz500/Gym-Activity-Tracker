import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Coach } from "./coach.entity";
import { Admin } from "./admin.entity";
import { Workout } from "./workout.entity";
import { Recommendations } from "./recommendation.entity";

@Entity("trainee")
export class Trainee extends User {
    @PrimaryGeneratedColumn()
    id!:number

    @Column({nullable:true})
    dateOfBirth!:Date

    @Column({nullable:true})
    gender!:string

    @Column({nullable:true})
    age!:number

    @Column({nullable:true})
    weight!:number

    @Column({nullable:true})
    height!:number

    @ManyToOne(() => Coach, (coach) => coach.trainees)
    coach!: Coach;

    @ManyToOne(() => Admin, (admin) => admin.trainees)
    admin!: Admin;

    @OneToMany(() => Workout, (workouts) => workouts.trainee)
    workouts!: Workout[]

    @OneToMany(() => Recommendations, (recommendations) => recommendations.trainee)
    recommendations!: Recommendations[]

}
