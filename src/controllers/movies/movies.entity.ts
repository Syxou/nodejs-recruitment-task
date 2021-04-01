import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Movies extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    released: string;

    @Column()
    genre: string;

    @Column()
    directory: string;

    @ManyToOne(()=> User, user => user.movies)
    user: User;

}