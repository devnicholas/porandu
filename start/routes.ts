/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AnswersController from 'App/Controllers/Http/AnswersController'
import PagesController from 'App/Controllers/Http/PagesController'
import QuestionsController from 'App/Controllers/Http/QuestionsController'
import UsersController from 'App/Controllers/Http/UsersController'

Route.get('/login', PagesController.login).as('login')
Route.post('/login', UsersController.login).as('login.action')
Route.get('/register', PagesController.register).as('register')
Route.post('/register', UsersController.register).as('register.action')
Route.get('/logout', UsersController.logout).as('logout')

Route.get('/', PagesController.main).as('main').middleware('auth')

Route.group(() => {
  Route.get('/', QuestionsController.all).as('questions.all')
  Route.get('/my', QuestionsController.my).as('questions.my')
  Route.get('/new', QuestionsController.new).as('questions.new')
  Route.get('/:id', QuestionsController.show).as('questions.show')

  Route.post('/new', QuestionsController.save).as('questions.save')
  Route.post('/:id/toggle-state', QuestionsController.toggleState).as('questions.toggleState')

  Route.post('/:id/answers', AnswersController.new).as('answers.save')
})
  .prefix('questions')
  .middleware('auth')

Route.group(() => {
  Route.post('/:id/delete', AnswersController.delete).as('answers.delete')
})
  .prefix('answers')
  .middleware('auth')

Route.group(() => {
  Route.get('/me', UsersController.profile).as('users.me')
  Route.post('/:id', UsersController.update).as('users.update')
})
  .prefix('users')
  .middleware('auth')
