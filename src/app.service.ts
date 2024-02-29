import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private configService: ConfigService,
  ) {}
  getHello(): string {
    this.cacheService.set('jun', { name: 'June Jo', login: 'jjo' });
    console.log(this.configService.get<number>('redis.port'));

    return 'Hello World!';
  }
}
