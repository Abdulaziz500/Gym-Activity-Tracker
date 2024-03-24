import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @Column({nullable:false})
    firstName!:string

    @Column({nullable:false})
    lastName!:string

    @Column({nullable:false})
    username!:string

    @Column({nullable:false})
    password!:string

    @Column({nullable:true})
    email!:string

    @Column({nullable:false})
    userRole!:string
}