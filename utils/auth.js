const crypto = require('crypto')

let admin_password = Buffer.from(process.env.ADMIN_PASSWORD, "hex") // 99f7f6e3447e591417568d1dc6e31ba2da460d1bc7b931a91b2448ec2b67de0e = admin
let admin_user = Buffer.from(process.env.ADMIN_USER, "hex") // 99f7f6e3447e591417568d1dc6e31ba2da460d1bc7b931a91b2448ec2b67de0e = admin

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
