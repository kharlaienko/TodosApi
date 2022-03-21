import { CategoryEntity } from './../../categories/entities/category.entity';
import { TodoEntity } from './../../todos/entities/todo.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   userName: string

   @Column({ unique: true })
   email: string

   @Column({ select: false })
   password: string

   @OneToMany(() => TodoEntity, (todo) => todo.user)
   todos: TodoEntity[]

   @OneToMany(() => CategoryEntity, (category) => category.user)
   categories: CategoryEntity[]

   @CreateDateColumn()
   createdAt: Date

   @UpdateDateColumn()
   updatedAt: Date

}
