const express = require('express')

const server = express()

const projects = []
var contador = 0

server.use(express.json())

// Middler que verifica se o projeto existe
function checkProjectExist(req, res, next) {
  const { id } = req.params
  const project = projects.find(p => p.id == id)

  if(!project) {
    return res.status(400).json({ error: 'Project not found' })
  }

  return next()
}

// Midleware que verifica o numero de requisições
function logRequest(req, res, next) {
  contador ++
  
  console.log(`Numero de requisições ${contador}`)

  return next()
}
//Usando o contador
server.use(logRequest)


// Rota que cadastra
server.post('/projects', (req, res) => {
  const { id, title } = req.body

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  return res.json(project)
})

// Rota de listagem
server.get('/projects', (req, res) => {
  return res.json(projects)
})

// Rota de atualização do titulo
server.put('/projects/:id', checkProjectExist,(req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find(p => p.id == id)

  project.title = title

  return res.json(project)
})

server.listen(3000)

//Rota para deletar
server.delete('/projects/:id', checkProjectExist,(req, res) => {
  const { id } = req.params

  projects.splice(id, 1)

  return res.json(projects)
})

server.post('/projects/:id/tasks', checkProjectExist,(req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find(p => p.id == id)

  project.tasks.push(title)

  return res.json(project)
})