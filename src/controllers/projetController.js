const projects = []
var counter = 0

class ProjectController {
    create(req, res) {
        const { id, title } = req.body

        const project = {
            id, title, tasks: []
        }

        projects.push(project)

        return res.json(project)
    }

    list(req, res) {
        return res.json(projects)
    }

    update(req, res) {
        const { id } = req.params
        const { title } = req.body

        const project = projects.find(p => p.id == id)

        project.title = title

        return res.json(project)
    }

    delete(req, res){
        const { id } = req.params

        projects.splice(id, 1)

        return res.json(projects)
    }

    tasks(req, res) {
        const { id } = req.params
        const { title } = req.body

        const project = projects.find(p => p.id == id)

        project.tasks.push(title)

        return res.json(project)
    }

    checkProjectExist(req, res, next) {
        const { id } = req.params
        const project = projects.find(p => p.id == id)
    
        if(!project) {
            return res.status(400).json({ error: 'Project not found' })
        }
    
        next()
    }

    logRequest(req, res, next) {
        counter ++

        console.log(`number of requests ${counter}`)

        return next()
    }
}

module.exports = new ProjectController()