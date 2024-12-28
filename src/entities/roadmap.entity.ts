import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'roadmap' })
export class Roadmap {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quarter: string;

    @Column()
    goal: string;

    @Column({ type: 'int', default: 0 })
    complete: number;
}
