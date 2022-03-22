import { AuthModule } from './auth/auth.module';
import { CategoryEntity } from './categories/entities/category.entity';
import { UserEntity } from './users/entities/user.entity';
import { TodoEntity } from './todos/entities/todo.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvVars: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'todo',
      entities: [TodoEntity, UserEntity, CategoryEntity],
      synchronize: true,
    }),
    TodosModule,
    UsersModule,
    CategoriesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
