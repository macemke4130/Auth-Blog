export interface UsersTable {
    id?: number,
    first_name?: string,
    last_name?: string,
    username?: string,
    email?: string,
    password?: string,
    is_visible?: number,
    created_at?: Date
}

export interface PostsTable {
    id?: number,
    user_id?: number,
    title?: string,
    content?: string,
    is_visible?: number,
    created_at?: Date,
    updated_at?: Date
}

export interface MySQLResponse {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: boolean,
    changedRows: number
}