import { Query } from '../';
import { MySQLResponse, PostsTable } from '../models';

const all = () => Query('select blogs.*, users.username from blogs join users on users.id = blogs.user_id')

const insert = (newPost: any) => Query<MySQLResponse>('Insert into blogs set ?', [newPost]);

const find = (column: string, value: string | number) => Query<PostsTable[]>('select * from blogs where ?? = ?', [column, value]);

export default {
    all,
    insert,
    find
}