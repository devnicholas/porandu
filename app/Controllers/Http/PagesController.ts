// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
  /**
   * main
   */
  public static async main({ response, auth }) {
    await auth.use('web').authenticate()

    return response.redirect().toRoute('questions.all')
  }

  public static async login({ view }) {
    return view.render('login')
  }

  /**
   * register
   */
  public static async register({ view }) {
    return view.render('users/register')
  }
}
