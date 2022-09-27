import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@blox3/infra-exception';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException('User is exits');
    }

    const createdUser = await this.userRepository.create(createUserDto);
    const saveUser = await this.userRepository.save(createdUser);
    return saveUser;
  }
}
