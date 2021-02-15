import { Query } from '../';
import { MySQLResponse, UsersTable } from '../models';

const insert = (newUser: any) => Query<MySQLResponse>('Insert into users set ?', [newUser]);

const find = (column: string, value: string | number) => Query<UsersTable[]>('select * from users where ?? = ?', [column, value]);

export default {
    insert,
    find
}