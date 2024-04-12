import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hashed = await bcrypt.hash('password', 10);
    createUserDto.password = hashed;
    const createdUser = await this.userRepository.save(createUserDto);
    const role = await this.roleService.findOne(createdUser.roleId);

    // const updated = await this.userRepository.save(updateUser);
    createdUser.role = role;
    return createdUser;
  }

  async findByPhone(phone: string): Promise<any> {
    let user;
    try {
      user = await this.userRepository.findOne({ where: { phone } });
    } catch (e) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  findAll(skip = 0, take = 20, orgId): Promise<[User[], number]> {
    return this.userRepository.findAndCount({
      skip,
      take,
      where: { orgId },
      relations: ['role'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userRepository.findOne({
      where: { id },
    });

    if (updateUserDto.firstName) {
      updateUser.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      updateUser.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.roleId) {
      updateUser.roleId = updateUserDto.roleId;
    }
    if (updateUserDto.email) {
      updateUser.email = updateUserDto.email;
    }
    if (updateUserDto.phone) {
      updateUser.phone = updateUserDto.phone;
    }
    const role = await this.roleService.findOne(updateUser.roleId);

    const updated = await this.userRepository.save(updateUser);
    updated.role = role;
    return updated;
  }

  async remove(id: number) {
    await this.userRepository.delete({ id });
  }

  async reset(resetPasswordDto: ResetPasswordDto, id: number) {
    const { oldPassword, newPassword } = resetPasswordDto;
    // const hashedOld = await bcrypt.hash(oldPassword, 10);
    const hashedNew = await bcrypt.hash(newPassword, 10);

    const userToUpdate = await this.userRepository.findOne({ where: { id } });
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      userToUpdate.password,
    );
    console.log({
      hashedNew,
      isOldPasswordCorrect,
      original: userToUpdate.password,
    });

    if (isOldPasswordCorrect) {
      userToUpdate.password = hashedNew;

      const updated = await this.userRepository.save(userToUpdate);
      return updated;
    } else {
      throw new NotFoundException('Passwords do not match');
    }
  }
}
