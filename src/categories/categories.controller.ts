import { UserId } from 'src/decorators/userId.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() dto: CreateCategoryDto, @UserId() userId: number) {
    return this.categoriesService.create(dto, userId);
  }

  @Get()
  findAll(@UserId() userId: number) {
    return this.categoriesService.findUsersCategories(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserId() userId: number) {
    return this.categoriesService.findOne(+id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, 1, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id, 1);
  }
}
