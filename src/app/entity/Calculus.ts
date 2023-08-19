import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Calculus {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 25
  })
  ip: string

  @Column({
    length: 625
  })
  query: string

  @Column("float")
  result: number

  @Column()
  timeTaken: number

  @Column({
    type: "timestamptz", default: () => "CURRENT_TIMESTAMP" 
  })
  createdAt: Date
}