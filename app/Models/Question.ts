import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Answer from './Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public active: boolean

  @column()
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public author: BelongsTo<typeof User>

  @hasMany(() => Answer, {
    foreignKey: 'question_id',
  })
  public answers: HasMany<typeof Answer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
