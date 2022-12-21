import connection from "../database/database.js";

const connect = connection;



const listStadium = async (req, res) => {
	try {

		let query = "SELECT * FROM stadium";
		let connected = await connect.getConnection();

		let result = await connected.query(query);

		if(result){
			res.status(200);
			res.json(result);
		}else{
			res.status(404);
			res.json([]);
		}
		connected.release();
	}catch (error) {
		console.log(error);
		res.status(500);
		res.json([])
	}
};//findUser ends


export const stadiumController = {
    listStadium
};
