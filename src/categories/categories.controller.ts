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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Query('orgId') orgId: number,
  ) {
    return this.categoriesService.create(createCategoryDto, orgId);
  }

  @Get()
  async findAll(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('orgId') orgId: number,
  ): Promise<{ data: Category[]; total: number }> {
    const [response, total] = await this.categoriesService.findAll(
      skip,
      take,
      orgId,
    );
    return { data: response, total };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
