const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// POST METHOD

router.post('/api/actions', (req, res) => {
    const { completed, description, notes, project_id } = req.body;
    const actionPost = { completed, description, notes, project_id };

    if (!actionPost.description || 
        !actionPost.notes || 
        !project_id ||
        actionPost.description.length < 1 ||
        actionPost.notes.length < 1 ) {
        userError(400, "Your action is missing projectID, description and/or notes", res);
        return;
    }
    actionDb
        .insert(actionPost)
        .then(response => {
            res.status(201).json(newAction);
        })
        .catch(error => {
            userError(500, "SOMETHING IS WRONG", res);
        })
});

// GET METHOD

router.get('/api/actions', (req, res) => {
    actionDb
        .get()
        .then(action => {
            res.json(action)
        })
        .catch(error => {
            userError(404, 'Somethings wrong', res);
        });
});

router.get('/api/actions/:id', (req, res) => {
    actionDb
        .get(id)
        .then(action => {
            res.json(action)
        })
        .catch(error => {
            userError(404, 'Somethings wrong', res);
        });
});


// DELETE METHOD

router.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;

    actionDb
        .get(id)
        .then(action => {
            actionDb
                .remove(id)
                .then(result => {
                    if (result === 0) {
                        userError(404, "No actions exist", res)
                    } else {
                        res.json(action);
                    }
                })
                .catch(error => {
                    userError(500, "Somethings wrong", res)
                })
        })
})

// PUT METHOD

router.put('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, notes, description, completed } = req.body;
    const actionPut = { project_id, notes, description, completed };

    if(!notes || !desciption || !project_id) {
        userError(400, "Please add project ID and name, description.", res)
        return;
    }else {
        actionDb
        .update(id, actionPut)
        .then( update => {
            res.json(actionPut);
        })
        .catch(error => {
            userError(500, "somethings wrong", res)
        });
    };
});



module.exports = router;

