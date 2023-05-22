// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Question from 'App/Models/Question'
import User from 'App/Models/User'

export default class QuestionsController {
  /**
   * list
   */
  public static async all({ view }) {
    const questions = await Question.query().orderBy('active', 'desc').orderBy('createdAt', 'desc')

    return view.render('questions/list', { questions })
  }

  /**
   * my
   */
  public static async my({ auth, view }) {
    const questions = await Question.query()
      .where('user_id', auth.user.id)
      .orderBy('active', 'desc')
      .orderBy('createdAt', 'desc')

    return view.render('questions/list', {
      onlyMy: true,
      questions,
    })
  }

  /**
   * show
   */
  public static async show({ params, view }) {
    const question = await Question.findOrFail(params.id)
    const author = await question.related('author').query().firstOrFail()
    const answers = await question.related('answers').query().preload('author')

    return view.render('questions/show', {
      question,
      author,
      answers,
      answers_count: answers.length,
    })
  }

  /**
   * new
   */
  public static async new({ view }) {
    return view.render('questions/new')
  }

  /**
   * save
   */
  public static async save({ auth, request, response }) {
    const data = request.only(['title', 'content'])
    const user = await User.findOrFail(auth.user.id)

    const question = await Question.create(data)
    await question.related('author').associate(user)

    return response.redirect().toRoute('questions.show', { id: question.id })
  }

  /**
   * toggleState
   */
  public static async toggleState({ auth, params, response }) {
    const question = await Question.findOrFail(params.id)
    const author = await question.related('author').query().firstOrFail()
    if (author.id === auth.user.id) {
      question.active = !question.active
      question.save()
    }

    return response.redirect().toRoute('questions.show', { id: question.id })
  }
}
