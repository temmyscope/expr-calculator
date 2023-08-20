import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Calculus {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 25, type: 'varchar' })
  ip: string;

  @Column({ length: 625 })
  query: string;

  @Column("float")
  result: number;

  @Column("float")
  timeTaken: number;

  @CreateDateColumn()
  createdAt: Date;
}