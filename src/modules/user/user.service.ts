import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@blox3/infra-exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException();
    }

    const createdUser = await this.userRepository.create(createUserDto);
    const saveUser = await this.userRepository.save(createdUser);
    delete saveUser.password;
    delete saveUser.refreshToken;
    return saveUser;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findByEmailAndGetPassword(email: string) {
    return this.userRepository.findOne({
      select: ['id', 'password', 'role'],
      where: { email },
    });
  }

  async findOne(filter: Record<any, any> = {}): Promise<User> {
    return this.userRepository.findOne({
      where: filter,
    });
  }

  async findById(id: string) {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneOrFail({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return this.userRepository.remove(user);
  }
}
