const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// POST METHOD

router.post('/api/projects', (req, res) => {
    const { name, description, completed,  } = req.body;
    const projectsPost = { completed, description, name  };

    if (
        projectsPost.name.length < 1 ||
        projectsPost.description < 1 ||
        !projectPost.name ||
        !projectPost.desciption
    ) {
        userError(400, "Your projects is missing name and/or description.", res);
        return;
    }
    projectDb
        .insert(projectsPost)
        .then(response => {
            res.status(201).json(projectsPost);
        })
        .catch(error => {
            userError(500, "SOMETHING IS WRONG", res);
        })
});

// GET METHOD

router.get('/api/projects', (req, res) => {
    projectDb
        .get()
        .then(projects => {
            res.json(projects)
        })
        .catch(error => {
            userError(404, 'Somethings wrong', res);
        });
});

router.get('/api/projects/:id', (req, res) => {
    projectDb
        .get(id)
        .then(projects => {
            res.json(projects)
        })
        .catch(error => {
            userError(404, 'Somethings wrong', res);
        });
});


// DELETE METHOD

router.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;

    projectDb
        .get(id)
        .then(projects => {
            projectsDb
                .remove(id)
                .then(result => {
                    if (result === 0) {
                        userError(404, "No actions exist", res)
                    } else {
                        res.json(projects);
                    }
                })
                .catch(error => {
                    userError(500, "Somethings wrong", res)
                })
        })
})

// PUT METHOD

router.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { description, completed, name } = req.body;
    const projectsPut = { description, completed, name };

    if(!name || !desciption ) {
        userError(400, "Please add name, description.", res)
        return;
    }else {
        projectDb
        .update(id, projectsPut)
        .then( update => {
            res.json(projectsPut);
        })
        .catch(error => {
            userError(500, "somethings wrong", res)
        });
    };
});





module.exports = router;
