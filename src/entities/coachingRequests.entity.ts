import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Trainee } from "./trainee.entity";
import { User } from "./user.entity";
import { Admin } from "./admin.entity";
import { Workout } from "./workout.entity";

@Entity("coaching-requests")
export class CoachingRequests extends User {
    @PrimaryGeneratedColumn()
    id!:number

    @Column({nullable:false})
    yearsOfExperience!:number

    @Column({nullable:false})
    certificate!:string

    @Column({nullable:true})
    gender!:string

    @Column({nullable:true})
    dateOfBirth!:Date

    @Column({nullable:true})
    age!:number

    @Column({nullable:false, default: false})
    accepted!:boolean

    @OneToMany(() => Trainee, (trainee) => trainee.coach)
    trainees!: Trainee[];

    @OneToMany(() => Workout, (workouts) => workouts.coach)
    workouts!: Workout[]

    @ManyToOne(() => Admin, (admin) => admin.coaches)
    admin!: Admin;

}