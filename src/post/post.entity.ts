import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity({ name: 'posts' })
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column({ default: "" })
    description: string;

    @Column({ default: "" })
    body: string;
    
    @Column('simple-array')
    tagList: string[];

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({ default: 0 })
    favoritesCount: number;

    @Column()
    authorId: number;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: 'authorId' })
    author: UserEntity;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date()
    }
}