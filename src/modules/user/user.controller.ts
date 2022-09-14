import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@blox3/infra-auth/decorator/public.decorator';
import { Role, Roles } from '@blox3/infra-auth/decorator';
import { UserService } from './user.service';
import { CreateAdminDto, CreateUserDto, DefaultColumnsResponse } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users') // put the name of the controller in swagger
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'create a user with customer role' })
  @ApiResponse({
    status: 201,
    type: DefaultColumnsResponse,
  })
  @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'create a user with admin role' })
  @ApiResponse({
    status: 201,
    type: DefaultColumnsResponse,
  })
  @ApiBearerAuth('access-token') // in the swagger documentation, a bearer token is required to access this endpoint
  @Roles(Role.Admin) // makes the endpoint accessible only by the admin
  @Post('admin')
  createAdmin(@Body() creatAdminDto: CreateAdminDto) {
    return this.userService.create(creatAdminDto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    type: DefaultColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth('access-token')
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
