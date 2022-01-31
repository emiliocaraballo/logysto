import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

// import { User } from '../entity/index';

export default class CreateUser implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        // const em = connection.createEntityManager();
        // const user = new User();
        // user.name="Emilio Fernando";
        // user.lastname="Caraballo Dueñas";
        // user.phone="3042334893";
        // user.email="emiliocaraballo9810@gmail.com";
        // return await em.save(user);
    }
  }
