
	insert into post values (default, default, default, "c", default, "test");
    insert into file values (default, "c", 999, default, "test", default, default);

select LAST_INSERT_ID();
select id from file;

/* File without post */
select * from file left join post on post.id = file.post where post.id is null;

/* post without file */
select * from post where post.id not in (select file.post from file)

<fieldset>
				<legend>Post à valider</legend>
				<table>
				<thead>
					<tr>
						<th>Post</th>
						<th>Valider</th>
					</tr>
				</thead>
				<tbody>
					{ props.files_without_post?.map((x) => {
						return <tr>
								<td><label htmlFor={x.name}>{x.name}</label></td>
								<td><select name={x.name} id={x.id}>
									<option value="">--Action--</option>
									<option value="VAL">Valider</option>
									<option value="DEL">Supprimer</option>
								</select></td>
							</tr>
					}) }
				</tbody>
				</table>
			</fieldset>

			var file = fs.readFile(filePath, 'binary');

res.setHeader('Content-Length', stat.size);
res.setHeader('Content-Type', 'audio/mpeg');
res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
res.write(file, 'binary');
res.end();