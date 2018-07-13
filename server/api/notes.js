const router = require('express').Router()
const { Note, User, Share } = require('../db/models')
const HttpError = require('../utils/HttpError');
module.exports = router

router.param('id', (req, res, next, id) => {
  Note.findById(id)
    .then(note => {
      if (!note) throw new HttpError(404);
      req.note = note;
      next();
    })
    .catch(next);
});

router.get('/', async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      where: {
        userId: req.session.passport.user
      },
      include: [{model: User}, {model: Share, include: [{model: User}]}]
    });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', (req, res, next) => {
  console.log('PUT')
  req.note
    .update(req.body)
    .then(fullNote => res.json(fullNote))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Note
  .create(req.body)
  .then(newNote => res.json(newNote))
  .catch(next)
})


// router.delete('/notes/delete', (req, res, next) => {
//   Note.destroy(req.body)
// })
