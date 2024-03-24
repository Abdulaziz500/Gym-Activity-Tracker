import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coach } from "./coach.entity";
import { Trainee } from "./trainee.entity";
import { User } from "./user.entity";

@Entity("admin")
export class Admin extends User {
    @PrimaryGeneratedColumn()
    id!:number

    @OneToMany(() => Trainee, (trainee) => trainee.admin)
    trainees!: Trainee[];

    @OneToMany(() => Coach, (coach) => coach.admin)
    coaches!: Coach[];

}
