import { print_all_tokens } from "../../utils/auth";
import { getCookies } from "cookies-next";

export default async function(req, res) {
	console.log(getCookies({req, res}))
	console.log(print_all_tokens())
	res?.status(202).end()
}