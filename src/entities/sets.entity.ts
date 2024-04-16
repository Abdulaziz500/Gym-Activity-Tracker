import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Includes } from './includes.entity';

@Entity("sets")
export class Sets extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    setNumber!: number;

    @Column({ nullable: true })
    weight?: number; // Making weight optional by using '?:'

    @Column({ nullable: false }) // Making reps required by omitting 'nullable' option
    reps!: number;

    @Column()
    done!: boolean;

    @ManyToOne(() => Includes, includes => includes.sets)
    includes!: Includes;
}
