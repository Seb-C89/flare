import { getCookie } from "cookies-next";

export default async function endpoint(req, res) {
	if(getCookie('admin', {req, res}))
		return res.status(202).end()
	else
		return res.status(503).end()
}