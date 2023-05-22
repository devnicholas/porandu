import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Question from './Question'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public question_id: number

  @column()
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public author: BelongsTo<typeof User>

  @belongsTo(() => Question, {
    foreignKey: 'question_id',
  })
  public question: BelongsTo<typeof Question>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
