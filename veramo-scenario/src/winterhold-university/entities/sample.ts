import {
    Entity,
    Column,
    PrimaryColumn
  } from 'typeorm'

  
@Entity()
//@ts-ignore
class StudentDidInfo {
    @PrimaryColumn()
    //@ts-ignore
    did: string

    @Column()
    //@ts-ignore
    studentNo: string

    @Column()
    //@ts-ignore
    studentName: string

    @Column()
    //@ts-ignore
    studentPhoneNumber: string
}

module.exports = StudentDidInfo