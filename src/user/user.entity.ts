import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { PasswordTransformer } from './password.transformer';
import { Watch } from '../watch/watch.entity'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Watch, watch => watch.ownedBy)
  watches: Watch[];

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255 })
  @IsEmail()
  email: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer
  })
  @Exclude()
  password: string
}

export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
