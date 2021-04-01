import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Movies } from "../movies/movies.entity";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    role: string;

    @Column()
    name: string;

    @OneToMany(() => Movies, movie => movie.user)
    movies: Movies[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}