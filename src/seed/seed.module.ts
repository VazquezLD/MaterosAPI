import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductoModule } from '../producto/producto.module';

@Module({
  imports: [ProductoModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
