import * as express from 'express';
import * as passport from 'passport';
import { isNonNullExpression } from 'typescript';
import db from '../../db';

import { ReqUser } from '../../utils/types';

const router = express.Router();

router.use('/profile', passport.authenticate('jwt'), async (req: ReqUser, res) => {
    try {
        const userid = req.user.id;
        const [profile] = await db.users.one(userid);
        delete profile.password;
        res.json(profile);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "nope", e})
    }
});

export default router;