create schema auth_blog;
use auth_blog;

create user 'auth_user'@'localhost' identified by 'root';
GRANT ALL ON auth_blog.* TO 'auth_user'@'localhost';

create table users (
	id int primary key auto_increment not null,
    first_name varchar(32),
    last_name varchar(32),
    username varchar(64) unique not null,
    email varchar(64) unique not null,
    password varchar(64) not null,
    is_visible bool default true,
    created_at timestamp default now()
);
select * from users;
delete from users where id > 1;

create table blogs (
	id int primary key auto_increment not null,
    user_id int not null,	foreign key (user_id) references users (id),
    title varchar(64) not null,
    content varchar(10000) not null,
    is_visible bool default true,
    created_at timestamp default now(),
    updated_at timestamp default now() on update now()
);
select * from blogs;