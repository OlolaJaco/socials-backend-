import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { PostEntity } from "@/post/post.entity";

@Entity({ name: 'users' })
    export class UserEntity {
       @PrimaryGeneratedColumn()
       id?: number;

       @Column()
         username: string;

       @Column({ })
       email: string;

       @Column({ default: "" })
       bio: string;

       @Column({ default: "" })
       image: string;

        @Column()
        password?: string;

        @OneToMany(() => PostEntity, post => post.author)
        posts: PostEntity[];

        @BeforeInsert()
        @BeforeUpdate()
        async hashPassword() {
            if (this.password) {
                const salt = await bcrypt.genSalt(10);
                this.password = await bcrypt.hash(this.password, salt);
            }
        }

        @UpdateDateColumn()
        updatedAt: Date;
    }