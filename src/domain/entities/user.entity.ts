import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { EUserStatus } from 'src/shared/enum';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Exclude()
  @Column({ type: 'text', select: false })
  password?: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: EUserStatus,
    default: EUserStatus.Inactive,
    nullable: false,
  })
  status: EUserStatus;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
