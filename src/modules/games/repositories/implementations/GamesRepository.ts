import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    return this.repository
      .createQueryBuilder("games")
      .where("UPPER(games.title) like :title", { title: `%${param.toUpperCase()}%` })
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    const query = `
      SELECT COUNT(*) as count FROM games; 
    `
    return this.repository.query(query);
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const [ game ] = await this.repository
      .createQueryBuilder("games")
      .leftJoinAndSelect("games.users", "users")
      .where("games.id = :id", {id})
      .getMany();
    return game.users;
    // Complete usando query builder
  }
}
