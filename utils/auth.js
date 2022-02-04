const crypto = require('crypto')

let tokens = {}
let admin_password = Buffer.from(process.env.ADMIN_PASSWORD, "hex") // 99f7f6e3447e591417568d1dc6e31ba2da460d1bc7b931a91b2448ec2b67de0e = admin
let admin_user = Buffer.from(process.env.ADMIN_PASSWORD, "hex") // 99f7f6e3447e591417568d1dc6e31ba2da460d1bc7b931a91b2448ec2b67de0e = admin
//console.log(process.env.ADMIN_PASSWORD, admin_password, admin_password.length)

export function generate_token(profil) {
	console.log("generate token")
	let token = crypto.randomBytes(12).toString('hex');
	let expiration = new Date()
		expiration.setDate(expiration.getDate() +1)

	//token = "_"+token
	tokens[token] = {
		token: token,
		expire: expiration,
		profil: profil
	}
	console.log(tokens)

	return tokens[token]
}

export function is_admin(user, password){
	let check1 = false, check2 = false
	
	if(user && password){
		let hashedUser = crypto.pbkdf2Sync(user, '::salt::', 100000, 32, 'sha256')
		check1 = crypto.timingSafeEqual(admin_user, hashedUser)

		let hashedPassword = crypto.pbkdf2Sync(password, '::salt::', 100000, 32, 'sha256')
		check2 = crypto.timingSafeEqual(admin_password, hashedPassword)
	}
	
	console.log(check1)
	console.log(check2)
	return check1 && check2;
}

export function get_profil(token) {
	if (tokens.hasOwnProperty(token))
		{console.log("HASOWNPROPS", tokens[token].profil)
		 return tokens[token].profil}
	else
		{console.log("NOTHINK")
		return null}
}

export function print_all_tokens(){
	console.log(tokens)
}

/*function clean(){
	tokens.forEach((e, i)=>{
		if(e.expire < Date.now)
			tokens.splice(i, 1)
	})	
}*/