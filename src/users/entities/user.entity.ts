import { TodoEntity } from './../../todos/entities/todo.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   userName: string

   @Column({ unique: true })
   email: string

   @Column()
   password: string

   @OneToMany(() => TodoEntity, todo => todo.user, { nullable: true })
   todos: TodoEntity[]

   @CreateDateColumn()
   createdAt: Date

   @UpdateDateColumn()
   updatedAt: Date

}
