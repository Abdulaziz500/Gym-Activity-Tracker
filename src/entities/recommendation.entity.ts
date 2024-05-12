import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,BaseEntity } from "typeorm";
import { Trainee } from "./trainee.entity";

@Entity("recommendation")
export class Recommendations extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number

    @Column({nullable:false})
    leanBodyMassLeftArm!:number

    @Column({nullable:false})
    leanBodyMassPercentLeftArm!:number

    @Column({nullable:false})
    leanBodyMassRightArm!:number

    @Column({nullable:false})
    leanBodyMassPercentRightArm!:number

    @Column({nullable:false})
    leanBodyMassLeftLeg!:number

    @Column({nullable:false})
    leanBodyMassPercentLeftLeg!:number

    @Column({nullable:false})
    leanBodyMassRightLeg!:number

    @Column({nullable:false})
    leanBodyMassPercentRightLeg!:number

    @Column({nullable:false})
    leanBodyMassTrunk!:number

    @Column({nullable:false})
    leanBodyMassPercentTrunk!:number

    @Column({nullable:false})
    recommendedBodyPart!:string

    @ManyToOne(() => Trainee, (trainee) => trainee.recommendations, { onDelete: "CASCADE" })
    trainee!: Trainee
}