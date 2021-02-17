import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const [post] = await db.posts.one(Number(req.params.id));
        res.json(post);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Nope.", e });
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await db.posts.all();
        res.json(posts);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Nope.", e });
    }
});

router.post('/', passport.authenticate('jwt'), async (req: any, res) => { // passport.authenticate('jwt') makes this route private --
    const newPost = req.body;
    try {
        newPost.user_id = req.user.id;
        const r = await db.posts.insert(newPost);
        const newPostId = r.insertId;
        res.json({ message: 'new post inserted', newPost, newPostId });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Nope.", e });
    }
});

router.put('/edit/:id', passport.authenticate('jwt'), async (req: any, res) => { // passport.authenticate('jwt') makes this route private --
    const editedPost = req.body;
    const id = req.params.id;
    try {
        editedPost.user_id = req.user.id;
        const r = await db.posts.editBlog(id, editedPost);
        res.json({ message: 'blog post updated'});
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Nope.", e });
    }
});

router.put('/destroy/:id', passport.authenticate('jwt'), async (req: any, res) => { // passport.authenticate('jwt') makes this route private --
    const blogId = req.params.id;
    try {
        const r = await db.posts.destroy(blogId);
        res.json({ message: 'blog post destroyed'});
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Nope.", e });
    }
});

export default router;