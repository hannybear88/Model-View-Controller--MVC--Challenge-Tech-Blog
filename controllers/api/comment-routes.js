const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

console.log("inside the comments controller")

router.get('/', (req,res) => {
    Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
    Comment.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post('/', async (req, res) => {
  console.log("inside the comment post route ")
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) { 
    console.log("err:  ------ >", err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: '404 Blog ID not found' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;