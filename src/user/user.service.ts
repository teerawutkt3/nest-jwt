import { Injectable } from '@nestjs/common';
import { User } from '../database/entity/user.entity';
import { RegisterRequestDto } from 'src/auth/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(req: RegisterRequestDto): Promise<User | undefined> {
    const hashedPassword = await bcrypt.hash(req.password, 10);
    const user = new User();
    user.username = req.username;
    user.password = hashedPassword;
    user.createdDate = new Date();
    user.createdBy = 'SYSTEM';
    return this.usersRepository.save(user);
  }
}
