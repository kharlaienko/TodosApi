import { UserEntity } from './users/entities/user.entity';
import { TodoEntity } from './todos/entities/todo.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'todo',
      entities: [TodoEntity, UserEntity],
      synchronize: true,
    }),
    TodosModule,
    UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
