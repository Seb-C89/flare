const crypto = require('crypto')

let tokens = []
let admin_password = Buffer.from(process.env.ADMIN_PASSWORD, "hex") // 99f7f6e3447e591417568d1dc6e31ba2da460d1bc7b931a91b2448ec2b67de0e
//console.log(process.env.ADMIN_PASSWORD, admin_password, admin_password.length)

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

	return tokens[token]
}

/*export function add_token(token) {
	tokens[token.token] = token
	console.log("ADD NEW TOKEN", token)
}*/

export function is_admin(user, password){
	let check1 = false, check2 = false
	
	if(user && password){
		check1 = crypto.timingSafeEqual(Buffer.from(process.env.ADMIN_USER), Buffer.from(user))

		let hashedPassword = crypto.pbkdf2Sync(password, '::salt::', 100000, 32, 'sha256')
		check2 = crypto.timingSafeEqual(admin_password, hashedPassword)
	}
	
	console.log(check1)
	console.log(check2)
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