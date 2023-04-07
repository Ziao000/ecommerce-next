    import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { Product } from '../entity/product.entity';
    import { ProductCreateDto } from '../dto/product-create.dto';
    import { ProductUpdateDto } from '../dto/product-update.dto';

    @Injectable()
    export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async getAllProducts() {
        const query = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .getMany()
        return query;
    }

    async createProduct(data: ProductCreateDto) {
        try {
        return this.productRepository.save(data);
        } catch (error) {
        console.log(error);
        throw new Error('Error while creating product');
        }
    }

    async getOneProductById(id: number) {
        return await this.productRepository.findOne({ where: { id } });
      }

    async updateProduct(id: number, data: ProductUpdateDto) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
        throw new Error('Product not found');
        }
        const productUpdate = { ...product, ...data };
        await this.productRepository.save(productUpdate);
        return productUpdate;
    }

    async deleteProduct(id: number) {
        return await this.productRepository.delete(id);
    }
    }
