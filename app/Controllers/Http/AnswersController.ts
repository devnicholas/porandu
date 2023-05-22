// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Answer from 'App/Models/Answer'
import Question from 'App/Models/Question'
import User from 'App/Models/User'

export default class AnswersController {
  /**
   * new
   */
  public static async new({ auth, params, request, response }) {
    const question = await Question.findOrFail(params.id)
    const user = await User.findOrFail(auth.user.id)
    const data = request.only(['content'])

    const answer = await Answer.create(data)
    await answer.related('author').associate(user)
    await answer.related('question').associate(question)

    return response.redirect().toRoute('questions.show', { id: question.id })
  }

  /**
   * delete
   */
  public static async delete({ auth, params, response }) {
    const answer = await Answer.findOrFail(params.id)
    if (answer.user_id !== auth.user.id) {
      return response.redirect().back() // Unauthorized
    }

    await answer.delete()
    return response.redirect().toRoute('questions.show', { id: answer.question_id })
  }
}
