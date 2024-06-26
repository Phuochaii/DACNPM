import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmApplicationReadRepository } from './application.read.repository';
import { UserNotificationSchemaMapper } from './mapper';
import { Projections, StartAppProjection } from './projection';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApplicationSchema } from './schema';
import { WriteRepositoryModule } from '../write/write-repository.module';
import { ApplicationReadRepository } from 'apps/application/src/domain/repository';
import { DatabaseConfiger } from '../database/init';

type DatabaseOptions = TypeOrmModuleOptions & { database: string };
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const defaultConfig: DatabaseOptions = {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: `${configService.get('DB_PASSWORD')}`,
          database: configService.get('DB_APPLICATION_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: true,
        };
        const databaseConfiger = new DatabaseConfiger(defaultConfig);
        return databaseConfiger.config();
      },
    }),
    TypeOrmModule.forFeature([ApplicationSchema]),
    WriteRepositoryModule,
  ],
  providers: [
    UserNotificationSchemaMapper,
    {
      provide: ApplicationReadRepository,
      useClass: TypeOrmApplicationReadRepository,
    },
    ...Projections,
  ],
  exports: [ApplicationReadRepository],
})
export class ReadRepositoryModule implements OnModuleInit {
  constructor(private readonly startAppProjection: StartAppProjection) {}
  async onModuleInit() {
    await this.startAppProjection.reconstruct();
  }
}
