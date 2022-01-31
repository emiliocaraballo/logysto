import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name:'users'})
export class User {
  @Column({type:'uuid'})
  id: string;
  @PrimaryGeneratedColumn()
  sequence: number;
  @Column({length:100})
  name: string;
  @Column({length:100})
  lastname: string;
  @Column({length:15})
  identification: string;
  @Column({length:15,nullable:true})
  phone: string;
  @Column({unique:true})
  email: string;
  @Column()
  password: string;
  @Column({type:'timestamp', nullable: true,default:'now()'})
  created_at: string;
  @Column({type:'timestamp', nullable: true,default:'now()'})
  updated_at: string;
}