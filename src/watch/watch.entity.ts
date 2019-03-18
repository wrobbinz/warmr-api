import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiModelProperty } from "@nestjs/swagger";
import { User } from '../user/user.entity';

export enum WatchType {
  PLACE = 'place',
  LOCATION = 'location',
}

@Entity()
export class Watch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.watches)
  ownedBy: User;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 200 })
  description: string;

  @Column({
    type: 'enum',
    enum: WatchType,
    default: WatchType.PLACE,
  })
  type: string;


  @Column()
  active: boolean;

  @Column('simple-json')
  location: {
    latitude: number,
    longitude: number,
  };

  @Column()
  distance: number;

  @Column()
  interval: number;
}

export class CreateWatchDto {
  @ApiModelProperty({ required: true })
  readonly name: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty({ enum: ['place', 'location'], required: true })
  readonly type: WatchType;

  @ApiModelProperty()
  readonly location: object;

  @ApiModelProperty({ required: true })
  readonly distance: number;

  @ApiModelProperty({ required: true })
  readonly interval: number;
}

export class UpdateWatchDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty({ enum: ['place', 'location'] })
  readonly type: WatchType;

  @ApiModelProperty()
  readonly location: object;

  @ApiModelProperty()
  readonly distance: number;

  @ApiModelProperty()
  readonly interval: number;
}

