import { EntityRepository, Repository } from "typeorm";

import { Movies } from "./movies.entity";

@EntityRepository(Movies)
export default class MoviesRepository extends Repository<Movies>{

}
