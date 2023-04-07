import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entity/category.entity';
import { CategoryCreateDto } from '../dto/category-create.dto';
import { CategoryUpdateDto } from '../dto/category-update.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories() {
    return await this.categoryRepository.find();
  }

  async createCategory(data: CategoryCreateDto) {
    try {
      return this.categoryRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating category');
    }
  }

  async getOneCategoryById(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async updateCategory(id: number, data: CategoryUpdateDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error('Category not found');
    }
    const categoryUpdate = { ...category, ...data };
    await this.categoryRepository.save(categoryUpdate);
    return categoryUpdate;
  }

  async deleteCategory(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
