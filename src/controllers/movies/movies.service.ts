import axios, { AxiosResponse } from "axios";
import * as moment from 'moment';
import { Between, getCustomRepository, getRepository } from "typeorm";
import { User } from "../user/user.entity";
import { Movies } from "./movies.entity";
import MoviesRepository from "./movies.repository";

interface IMovieFath extends AxiosResponse {
    Title: string,
    Released: string,
    Genre: string,
    Directory: string
}

export const getAllMoviesByUser = async ({ id }: User, title?: string): Promise<Movies[] | Movies> => {
    const moviesRepo = getCustomRepository(MoviesRepository);
    if (title) {
        const movie = await moviesRepo.createQueryBuilder('movies')
            .leftJoin('movies.user', 'user')
            .where("user.id = :id", { id })
            .andWhere("movies.title = :title", { title })
            .select([
                'movies'
            ]).getOne();

        return movie;
    }
    const movies = await moviesRepo.createQueryBuilder('movies')
        .leftJoin('movies.user', 'user')
        .where("user.id = :id", { id })
        .select([
            'movies'
        ]).getMany();

    return movies;
}

export const AddMovie = async (title: string, userId: number) => {
    const user = await User.findOne({ id: userId })

    if (!user) {
        return {
            status: 404,
            error: true,
            message: "User not found."
        }
    }

    const possibilityUser = await checkPossibilityUser(user);
    if (possibilityUser && user.role === "basic") {
        return {
            status: 200,
            error: true,
            message: `You have exceeded the limit. Please buy a premium subscription for 29.99$`,
        }
    }

    const movie = await fetchMovie(title);

    const hasMovie = await getAllMoviesByUser(user, movie.Title);

    if (hasMovie) {
        return {
            status: movie.status as number,
            error: true,
            message: `${user.name} already has this movie: ${movie.Title}`,
        }
    }
    if (movie.status) {
        return {
            status: movie.status as number,
            error: true,
            message: movie.statusText,
        }
    }

    if (movie.Response === "False") {
        return {
            status: 404,
            error: true,
            message: movie.Error,
        }
    }
    // added movie section.
    try {
        const newMovie = new Movies();
        newMovie.title = movie.Title;
        newMovie.released = movie.Released;
        newMovie.genre = movie.Genre;
        newMovie.directory = movie.Director;
        newMovie.user = user;
        newMovie.createTime = moment(new Date()).toString();
        newMovie.save();

    } catch (error) {
        return {
            status: 500,
            error: true,
            message: "Save error",
        }
    }
    return {
        status: 200,
        error: false,
        message: `Movie ${movie.Title} added to User ${user.name}`,
    };
}

const checkPossibilityUser = async (user: User): Promise<boolean> => {
    var startDate = moment(new Date()).startOf('month');
    var endDate = startDate.clone().endOf('month');

    const movies = await Movies.count({
        relations: ["user"],
        where: {
            createTime: Between(startDate.toDate(), endDate.toDate()),
            user: user.id
        }
    })

    return movies >= 5;
}

export const fetchMovie = async (title: string) => {
    return axios({
        method: 'get',
        url: `http://www.omdbapi.com/?apikey=d9667a10&t=${title}&type=movie`,
    })
        .then((res) => res.data)
        .catch((err) => err.response)
}
