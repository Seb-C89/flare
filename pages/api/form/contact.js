//import { insert_message } from "../../../utils/db.js"
const nodemailer = require("nodemailer");
import { withSessionRoute, unseal_mail_perm } from "../../../utils/withIronSession";

export default withSessionRoute(async (req, res) => {
	/* unseal mail_perm */
	/*if(!req.session?.mail_perm === true)
		if(req.query?.mail)
			await unseal_mail_perm(req, res)*/

	if(req.method === 'POST' && req.session?.mail_perm === true){
		if(req.body.message && req.body.reply_to) {
			await send_mail(req.body.message, req.body.reply_to, req.body.subject)
				.then(() => {
					req.body.submited = true
					res.status?.(202).end()
				})
				.catch(e => {
					req.body.error = true
					res.status?.(503).end()
					console.log(e)
				})
		} else
			res.status?.(503).end()
	} else
		res.status?.(404).end()
})

function send_mail(message, reply_to, subject) {
	if(
		message &&
		/^[^@ ]+@[^@ ]+$/.test(reply_to)
	){
		let transporter = nodemailer.createTransport({ // TODO add all param
			service: process.env.MAIL_HOST,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD,
			},
		});

		var mail = {
			from: process.env.MAIL_USER,
			to: process.env.MAIL_USER,
			replyTo: reply_to,
			subject: subject,
			text: message,
			//html: "<p>HTML version of the message</p>"
		};

		return transporter.sendMail(mail)
		/*return new Promise((resolve, reject) => { // testing purpose
			resolve()
		})*/
	} 
	else 
		return new Promise((resolve, reject) => {
			reject("message is falsy or reply_to is incorrecte")
		})
}

/*
// SQL version
if( message && reply_to)
		await insert_message(message, reply_to).then(() => {
										//console.log("inserting message "+message+"from "+reply_to)
										return res.status(202).end()
									}).catch(() => {
										//console.error("when inserting message "+message+"from "+reply_to)
										return res.status(500).end()
									})
	else
		return res.status(400).end();
*/
	

/*
// Verify if transporter params works
transporter.verify(function (error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log("Server is ready to take our messages");
	}
});
*/