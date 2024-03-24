import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto, @Query('orgId') orgId: number) {
    createMenuDto.orgId = orgId;
    return this.menusService.create(createMenuDto);
  }

  @Get()
  async findAll(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('orgId') orgId: number,
    @Query('categoryId') categoryId: number,
  ): Promise<{ data: Menu[]; total: number }> {
    const [response, total] = await this.menusService.findAll(
      skip,
      take,
      orgId,
      categoryId,
    );
    return { data: response, total };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
