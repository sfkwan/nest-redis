import { Inject, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}
  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  async findAll() {
    const date = new Date();
    console.log(`current datetime: ${date.toISOString()}`);

    return `This action returns all cats ${date.toISOString()}`;
  }

  async findOne(id: number): Promise<Cat> {
    const cachedData = await this.cacheService.get<Cat>(id.toString());

    if (cachedData) {
      console.log(`Getting data from cache! ${JSON.stringify(cachedData)}`);
      return cachedData;
    }

    //Simulate slow backend
    const p1 = await new Promise((res) => setTimeout(() => res('p1'), 10000));
    const date = new Date();
    console.log(`current datetime: ${date.toISOString()}`);

    const comment = {
      comment: `This action find a #${id} cat`,
      date: `${date.toISOString()}`,
    };

    await this.cacheService.set(id.toString(), comment, 60000);
    return comment;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
