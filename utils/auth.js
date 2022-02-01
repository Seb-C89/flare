const crypto = require('crypto')

let tokens = []

export function generate_token() {
	return crypto.randomBytes(12).toString('hex');
}

export function add_token(token) {
	tokens[token.token] = token
	console.log("ADD NEW TOKEN", token)
}

export function get_profil(token) {
	console.log("check profil")
	console.log(tokens.hasOwnProperty(token), tokens[token])
	if (tokens.hasOwnProperty(token))
		return tokens[token].profil
	else
		return null
}

export function print_all_tokens(){
	console.log(tokens)
}

function clean(){
	tokens.forEach((e, i)=>{
		if(e.expire < Date.now)
			tokens.splice(i, 1)
	})	
}