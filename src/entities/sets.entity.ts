import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Includes } from './includes.entity';

@Entity("sets")
export class Sets extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    setNumber!: number;

    @Column()
    weight!: number;

    @Column()
    reps!: number;

    @Column()
    done!: boolean;

    @ManyToOne(() => Includes, includes => includes.sets)
    includes!: Includes;
}
