CREATE DATABASE IF NOT EXISTS master;

USE master;

CREATE TABLE IF NOT EXISTS Users 
(
    id       int identity,
    mail     varchar(255) not null,
    password varchar(255) not null
)


CREATE TABLE IF NOT EXISTS ToDoTask
(
    id       int identity,
    name     varchar(255) not null,
    description varchar(255),
    columnId int  not null
)

CREATE TABLE IF NOT EXISTS ToDoLists
(
    id       int identity,
    name     varchar(255) not null,
    userdId int  not null
)

CREATE TABLE IF NOT EXISTS Columns
(
    id       int identity,
    name     varchar(255) not null,
    listId int  not null
    )