import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';
import { Connection, getConnection, getCustomRepository, QueryFailedError } from 'typeorm';

import { User } from '../controllers/user/user.entity';
import UserRepository from '../controllers/user/user.repository';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const basicRole = "basic";
        const basicName = "Basic Thomas";
        const basicUsername = "basic-thomas";
        const basicSalt = await bcrypt.genSalt();
        const basicPassword = await bcrypt.hash("sR-_pcoow-27-6PAwCD8", basicSalt);

        const PremiumRole = "premium";
        const PremiumName = "Premium Jim";
        const PremiumUsername = "premium-jim";
        const PremiumSalt = await bcrypt.genSalt();
        const PremiumPassword = await bcrypt.hash("GBLtTyq3E_UNjFnpo9m6", PremiumSalt);

        await connection.query(
            `INSERT INTO user (name, username, password, role, salt)`
            + `VALUES ("${basicName}","${basicUsername}","${basicPassword}","${basicRole}", "${basicSalt}"),`
            + `("${PremiumName}","${PremiumUsername}","${PremiumPassword}","${PremiumRole}", "${PremiumSalt}")`
        ).catch((err: Error) => {
            console.log(err)
        })
    }
}
