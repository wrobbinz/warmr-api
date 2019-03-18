import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watch, CreateWatchDto, UpdateWatchDto } from './watch.entity';


@Injectable()
export class WatchService {
  constructor(
    @InjectRepository(Watch)
    private readonly watchRepository: Repository<Watch>,
  ) { }

  async getByUser(id: number) {
    return this.watchRepository
      .find({ where: { ownedBy: id } });
  }

  async create(payload: CreateWatchDto, id: any) {
    const newWatch = {
      ...payload,
      ownedBy: id,
    }

    return await this.watchRepository.save(
      this.watchRepository.create(newWatch)
    );
  }

  async update(updateWatchDto: UpdateWatchDto, id: number) {
    const watch = await this.watchRepository.findOne(id)
    const newWatch = { ...watch, ...updateWatchDto }
    return this.watchRepository.update(id, newWatch)
  }

  async remove(id: number) {
    const watch = await this.watchRepository.findOne(id)
    return this.watchRepository.remove(watch)
  }
}
