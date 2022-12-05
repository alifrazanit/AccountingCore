import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterModule } from './modules/master/master.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from '@config/config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from '@modules/auth/auth.module';
import { TransactionModule } from '@modules/transaction/transaction.module';
import { PurchaseController } from './controllers/transaction/purchase/purchase.controller';
import { PurchaseService } from './services/transaction/purchase/purchase.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
      }),
    }),
    AuthModule,
    MasterModule,
    TransactionModule],
  controllers: [AppController, PurchaseController],
  providers: [AppService, PurchaseService]
})
export class AppModule {}
