import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { CommonService } from './prisma/common/common.service';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [CommonService],
})
export class AppModule {}
