import connection from "../database/database.js";

const connect = connection;

const findNextGameByTeam = async (req, res) => {
	try {
        let { team } = req.body;
        let currentDate = new Date().toISOString().split('T')[0];
		let query = "SELECT game.game_id, localT.team_id, localT.name as localTeam,visit.name as visitT, visit.team_id as vId, DATE_FORMAT(game.date, '%m/%d/%Y %H:%m') as date, stadium.stadium_id, stadium.name as stadiumName, stadium.address as stadiumAddress "
		+"FROM `game` INNER JOIN stadium on game.stadium_id = stadium.stadium_id "
		+"INNER JOIN team visit on visit.team_id = game.visit_id "
		+"INNER JOIN team localT on localT.team_id = game.local_id "
		+"WHERE `date` >= '"+ currentDate +"' "
		+"and (localT.team_id = "+team+" or visit.team_id = "+team+") ORDER BY date ASC limit 2";

		let connected = await connect.getConnection();

		let result = await connected.query(query);

		if(result){
			res.status(200);
			res.json(result);
		}else{
			res.status(404);
			res.json([]);
		}

	}catch (error) {
		console.log(error);
		res.status(500);
		res.json([])
	}
};//findUser ends


const createMatch = async (req, res) => {
	try {
		
		let { local, visit, stadium, date } = req.body;
		let query = `INSERT into game values(null, ${local}, ${visit}, ${stadium}, '${date}')`;
		let connection = await connect.getConnection();
		let result = await connection.query(query);

		if(!result.affectedRows > 0){
			res.status(404)
		}else{
			res.status(202)
		}

		res.json(result);
	}catch (error) {
		console.log(error);
		res.status(500);
	}
};

const updateMatch = async (req, res) => {
	try {
		let { local, visit, stadium, date, game } = req.body;
		let query = `UPDATE game SET local_id=${local}, visit_id=${visit},stadium_id=${stadium},date='${date}' where game_id=${game}`;
		let connection = await connect.getConnection();
		let result = await connection.query(query);
		
		if(!result.affectedRows > 0){
			res.status(404)
		}else{
			res.status(202)
		}

		res.json(result);
	}catch (error) {
		console.log(error);
		res.status(500);
		res.json({});
	}
};

const deleteMatch = async (req, res) => {
	try {
		let { id } = req.body;
		let query = `DELETE from game where game_id=${id}`;
		let connection = await connect.getConnection();
		let result = await connection.query(query);
		
		if(!result.affectedRows > 0){
			res.status(404)
		}else{
			res.status(202)
		}

		res.json(result);
	}catch (error) {
		console.log(error);
		res.status(500);
		res.json({});
	}
};

export const gameController = {
    findNextGameByTeam,
    createMatch,
	updateMatch,
	deleteMatch
};
