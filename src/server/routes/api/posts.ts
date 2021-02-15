import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';

const router = express.Router();

router.get('/', passport.authenticate('jwt'), async (req, res) => { // passport.authenticate('jwt') makes this route private --
    try {
       const posts = await db.posts.all();
       res.json(posts);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "isuckatcode", e });
    }
});

router.post('/', passport.authenticate('jwt'), async (req: any, res) => {
    const newPost = req.body;
    try { //insert userid = req.user.userid --
        newPost.user_id = req.user.id;
        await db.posts.insert(newPost);
        res.json({ message: 'new post inserted', newPost });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "isuckatcode", e });
    }
});

export default router;