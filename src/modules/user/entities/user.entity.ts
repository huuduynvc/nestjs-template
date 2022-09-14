import { Role } from '@blox3/infra-auth/decorator';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/common/entities';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false, nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Client,
  })
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
