import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Trainee } from "./trainee.entity";
import { User } from "./user.entity";
import { Admin } from "./admin.entity";

@Entity("coaches")
export class Coach extends User {
    @PrimaryGeneratedColumn()
    id!:number

    @Column({nullable:false})
    yearsOfExperience!:number

    @Column({nullable:true})
    certificate!:string

    @OneToMany(() => Trainee, (trainee) => trainee.coach)
    trainees!: Trainee[];

    @ManyToOne(() => Admin, (admin) => admin.coaches)
    admin!: Admin;

}
