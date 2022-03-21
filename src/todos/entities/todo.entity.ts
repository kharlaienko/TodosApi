import { UserEntity } from './../../users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('todos')
export class TodoEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   title: string

   @Column({ nullable: true })
   description: string

   @Column({ default: false })
   isComplete: boolean

   @ManyToOne(() => UserEntity, (user) => user.todos, { nullable: false })
   @JoinColumn()
   user: UserEntity

   @CreateDateColumn()
   createdAt: Date

   @UpdateDateColumn()
   updatedAt: Date

}
