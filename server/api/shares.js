const router = require('express').Router()
const {Share, Note, User} = require('../db/models')
const HttpError = require('../utils/HttpError');


module.exports = router

router.param('id', (req, res, next, id) => {
  Share.findById(id)
    .then(share => {
      if (!share) throw HttpError(404);
      req.share = share;
      next();
    })
    .catch(next);
});

router.get('/', async (req, res, next) => {
  try {
    const shares = await Share.findAll({
      where: {
        userId: req.session.passport.user,

      },
      include: [{model: Note, include: [{model: User}]}]
    });
    res.json(shares);
  } catch (err) {
    next(err);
  }
});

// router.get('/', async (req, res, next) => {
//   try {
//     const shares = await Note.findAll({
//       include: {
//         model: Share
//       }
//       // where: {
//       //   userId: req.session.passport.user,
//       //   include: [{model: Note}]
//       // }
//     });
//     console.log('shares, ', shares);
//     res.json(shares);
//   } catch (err) {
//     next(err);
//   }
// });

router.post('/shares', (req, res, next) => {
  Share.create(req.body)
    .then(share => res.status(201).json(share))
    .catch(next);
});

router.delete('shares', (req, res, next) => {
  req.share.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});
