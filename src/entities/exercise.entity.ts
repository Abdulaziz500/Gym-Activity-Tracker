import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Includes } from './includes.entity';

@Entity("exercise")
export class Exercise extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    type!: string;

    @Column()
    muscle!: string;

    @Column()
    equipment!: string;

    @Column()
    difficulty!: string;

    @Column({ type: 'text' })
    instructions!: string;

    @Column({ nullable: true })
    imagePath!: string;

    @OneToMany(() => Includes, includes => includes.exercise)
    includes!: Includes[];
}