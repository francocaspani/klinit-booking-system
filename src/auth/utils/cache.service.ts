import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async storeCode(email: string, code: string) {
    await this.cacheManager.set(email, code, 300000);
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const cachedCode = await this.cacheManager.get(email);
    return cachedCode === code;
  }
}
