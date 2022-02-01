const crypto = require('crypto')

let tokens = []

export function generate_token(profil) {
	let token = crypto.randomBytes(12).toString('hex');
	let expiration = new Date()
		expiration.setDate(expiration.getDate() +1)

	tokens[token] = {
		token: token,
		expire: expiration,
		profil: profil
		// TODO may be add adresse ip to detecte stolen token
	}

	return token
}

/*export function add_token(token) {
	tokens[token.token] = token
	console.log("ADD NEW TOKEN", token)
}*/

export function is_admin(user, password){
	let check1 = false, check2 = false
	
	check1 = crypto.timingSafeEqual(process.env.ADMIN_USER, user)

	crypto.pbkdf2(password, '::salt::', 100000, 32, 'sha256', function(err, hashedPassword) {
		if (err) { return false }
		check2 = crypto.timingSafeEqual(process.env.ADMIN_PASSWORD, hashedPassword)
	})
	
	return check1 && check2;
}

export function get_profil(token) {
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