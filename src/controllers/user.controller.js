import connection from "../database/database.js";
import bcript from "bcrypt";
import util from "../util/util.js";

const connect = connection;

const updateSession = function(row, hashToken, token){
	if(row.token){
		connection.query(
			"UPDATE saved_session SET token = "+"'"+hashToken +"' "+" WHERE user_id ="+rows[0].user_id
			);
	}else{
		connection.query(
			"INSERT INTO saved_session (`session_id`, `user_id`, `token`) VALUES (NULL, '"+rows[0].user_id+"', '"+hashToken+"');"
			);
	}//if ends

	row.token = token;
	return
}

const findUser = async (req, res) => {
	try {
		const { email, pwd, saveUser } = req.body;
		const emailQuery = "SELECT user.user_id, user.name, email, password, team.team_id as team_id, team.name as teamName "
		+", team.local_stadium FROM user INNER JOIN team ON user.team_id = team.team_id "+
		"WHERE user.email ='"+email+"'";
		
		const connection = await connect.getConnection();

		connection.query(emailQuery, function(errors, rows, field){	

			if(rows !== undefined){
				if(rows.length > 0){
					bcript.compare(pwd, rows[0].password).then(async function(comparasion){
						if(comparasion){
							if(saveUser){
								let token = util.generateString(6);
								let hashToken = bcript.hash(token, 10).then(updateSession(rows[0], hashToken, token));
								
							}else{
								delete rows[0].token;
							}//saveUser IF ends
							delete rows[0].user_id
							delete rows[0].password;

							res.status(200);
							res.json(rows);
							connection.release();
						}else{

							res.status(404);
							res.json([]);
							connection.release();
						}
						return;
					});//bscript.compare ends
				}else{
					res.status(404);
					res.json([])
				}
				
			}else{
				res.status(404);
				res.json([])	
				return;
			}
		});//connection.query end
		return;
	}catch (error) {
		console.log(error)
		res.status(500);
		res.json([])
	}
};//findUser ends

const registerUser = async (req, res) => {
	try {
		const { email, pwd, name, team } = req.body;
		const userQuery = "SELECT name FROM `user` WHERE email='"+email+"'";
		const connection = await connect.getConnection();

		connection.query(userQuery, async function(errors, rows, field){	
			if(rows.length > 0){
				res.status(409);
				res.json([])	
				return;
			}else{

				let hashPwd = await bcript.hash(pwd, 10);
				const insertQuery = "INSERT into user values (null, '"+name+"', '"+email+"', '"+hashPwd+"', "+team+")";
				
				await connection.query(insertQuery,function(errors, rows, field){
					res.status(202);
					res.json([])
				} );
					
				return;
			}
		});//connection.query ends

		return;
	}catch (error) {
		res.status(500);
		res.json([])
	}
};//registerUser ends

const encriptPassword = async (req, res) => {
	try {
		
		let { pwd } = req.body;
		let hash = await bcript.hash(pwd, 10);

		let query = "UPDATE user SET password='"+hash+"' "+"WHERE user_id ="+id;
		let connection = await connect.getConnection();
		let result = await connection.query(query);

		if(!result.length > 0){
			res.status(404)
		}

		res.json(hash);
	}catch (error) {
		res.status(500);
	}
};

export const userController ={
	findUser,
	registerUser,
	encriptPassword
};
