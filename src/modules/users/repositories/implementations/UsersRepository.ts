import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const [user] = await this.repository.find({
      where: { id: user_id }, 
      relations: ["games"] 
    });

    if (!user) throw new Error('user not exists');

    return user
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    const query = `SELECT * FROM users ORDER BY first_name`
    return this.repository.query(query); 
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    const query = `
      SELECT 
        * 
      FROM 
        users u 
      WHERE UPPER(u.first_name) = '${first_name.toUpperCase()}'
      AND UPPER(u.last_name) = '${last_name.toUpperCase()}'
      `
    return this.repository.query(query); 
  }
}
