import { UserEntity } from './../../users/entities/user.entity';
import { TodoEntity } from './../../todos/entities/todo.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categories')
export class CategoryEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   title: string;

   @OneToMany(() => TodoEntity, (todo) => todo.category)
   todos: TodoEntity[]

   @ManyToOne(() => UserEntity, (user) => user.categories, { nullable: true, onDelete: 'CASCADE' })
   @JoinColumn()
   user: UserEntity

   @CreateDateColumn()
   createdAt: Date

   @UpdateDateColumn()
   updatedAt: Date
}
