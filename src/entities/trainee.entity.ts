import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Coach } from "./coach.entity";
import { Admin } from "./admin.entity";

@Entity("trainees")
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

}
