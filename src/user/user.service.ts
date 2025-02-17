import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
 
  constructor(
    private prisma: PrismaService
  ){}
 async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
      },
      select:{id:true,email:true, status:true}
    });
    return user;
  }

  async findAll() {
    //return `This action returns all user`;
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
  
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  findEmail(username: string) {
    return this.prisma.user.findFirst({
      where: {
        email: username,
      },
    });
  }
}
