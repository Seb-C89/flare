import { get_recent, get_by_game } from "../../../../utils/db.js"

export default async function handler(req, res) {
	const { by, where } = req.query;
	let r;
	switch(req.method){
		case "GET":
			switch(by){
				case "recent":
					r = get_recent()
					break;
				case "game":
					r = get_by_game(where);
					break;
				default:
					return res.status(404).end();
			}
			break;
		default:
			return res.status(404).end();
	}
	console.log("end api");
	await r.then((a) => {return res.status(200).json(a)}).catch((a) => {return res.status(500).end()})
}
