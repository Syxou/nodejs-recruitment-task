import { Movies } from "./movies.entity";

export const getAllMovies = async (): Promise<Movies[]> => {
    const movies = await Movies.find();
    return movies;
}
