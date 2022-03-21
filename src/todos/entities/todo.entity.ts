import { CategoryEntity } from './../../categories/entities/category.entity';
import { UserEntity } from './../../users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum TodoPriority {
   HIGHT = 'HIGHT',
   MEDIUM = 'MEDIUM',
   LOW = 'LOW',
}
@Entity('todos')
export class TodoEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   title: string

   @Column({ default: TodoPriority.LOW })
   priority: TodoPriority

   @Column({ nullable: true })
   description: string

   @Column({ default: false })
   isComplete: boolean

   @ManyToOne(() => UserEntity, (user) => user.todos, { nullable: false, onDelete: 'CASCADE' })
   @JoinColumn()
   user: UserEntity

   @ManyToOne(() => CategoryEntity, (category) => category.todos, { nullable: true, onDelete: 'SET NULL' })
   @JoinColumn()
   category: CategoryEntity

   @CreateDateColumn()
   createdAt: Date

   @UpdateDateColumn()
   updatedAt: Date

}
