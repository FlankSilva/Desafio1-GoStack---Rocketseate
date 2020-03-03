const { Router } = require('express')
const projectController = require('./controllers/projetController')

const routes = new Router()

routes.post('/projets', projectController.create)
routes.get('/list', projectController.list)
routes.put('/update/:id', projectController.checkProjectExist, projectController.update)
routes.delete('/delete/:id', projectController.checkProjectExist, projectController.delete)
routes.post('/projects/:id/tasks', projectController.checkProjectExist, projectController.tasks)

module.exports = routes