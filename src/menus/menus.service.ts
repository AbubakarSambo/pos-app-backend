import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}
  create(createMenuDto: CreateMenuDto) {
    console.log({ createMenuDto });
    return this.menuRepository.save(createMenuDto);
  }

  findAll(skip = 0, take = 20, orgId, categoryId): Promise<[Menu[], number]> {
    return this.menuRepository.findAndCount({
      skip,
      take,
      where: { orgId: orgId, categoryId: categoryId },
    });
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.findOne({ where: { id } });
    if (!menu) {
      throw new NotFoundException('Could not find menu');
    }

    return menu;
  }
  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const updateMenu = await this.menuRepository.findOne({
      where: { id },
    });
    console.log({ updateMenu, updateMenuDto });
    if (updateMenuDto.name) {
      updateMenu.name = updateMenuDto.name;
    }
    if (updateMenuDto.price) {
      updateMenu.price = updateMenuDto.price;
    }
    if (updateMenuDto.description) {
      updateMenu.description = updateMenuDto.description;
    }
    if (updateMenuDto.image) {
      updateMenu.image = updateMenuDto.image;
    }
    if (updateMenuDto.categoryId) {
      updateMenu.categoryId = updateMenuDto.categoryId;
    }
    const updated = await this.menuRepository.save(updateMenu);
    return updated;
  }

  async remove(id: number) {
    await this.menuRepository.delete({ id });
  }
}
