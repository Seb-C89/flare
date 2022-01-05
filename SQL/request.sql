
	insert into post values (default, default, default, "c", default, "test");
    insert into file values (default, "c", 999, default, "test", default, default);

select LAST_INSERT_ID();
select id from file;

/* File without post */
select * from file left join post on post.id = file.post where post.id is null;

/* post without file */
select * from post where post.id not in (select file.post from file)