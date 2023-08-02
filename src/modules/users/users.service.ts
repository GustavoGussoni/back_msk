import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (findUser) throw new ConflictException('User already exists!');

    const createUser = await this.usersRepository.create(createUserDto);

    return createUser;
  }

  async findAll() {
    const getUsers = await this.usersRepository.findAll();

    if (!getUsers.length)
      throw new NotFoundException('There is no users at database!');

    return getUsers;
  }

  async findOne(id: string) {
    const getUser = await this.usersRepository.findOne(id);

    if (!getUser) throw new NotFoundException('User not found!');

    return getUser;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const getUser = await this.usersRepository.findOne(id);

    if (!getUser) throw new NotFoundException('User not found!');

    const user = await this.usersRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: string) {
    const getUser = await this.usersRepository.findOne(id);

    if (!getUser) throw new NotFoundException('User not found!');

    await this.usersRepository.delete(id);
    return;
  }
}
