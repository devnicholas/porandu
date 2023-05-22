// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  /**
   * profile
   */
  public static async profile({ view }) {
    return view.render('users/profile')
  }

  /**
   * login
   */
  public static async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberMe = request.input('remember') ?? false

    await auth.use('web').attempt(email, password, rememberMe)
    return response.redirect().toRoute('main')
  }

  /**
   * logout
   */
  public static async logout({ auth, response }) {
    await auth.use('web').logout()
    return response.redirect().toRoute('login')
  }

  /**
   * register
   */
  public static async register({ request, response, auth }) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create(data)

    await auth.use('web').login(user)

    return response.redirect().toRoute('main')
  }

  /**
   * update
   */
  public static async update({ request, response, params }) {
    const userId = params.id
    const name = request.input('name')
    const password = request.input('password')

    const user = await User.findOrFail(userId)
    user.name = name
    if (password) user.password = password
    await user.save()

    response.redirect().toRoute('users.me')
  }
}
