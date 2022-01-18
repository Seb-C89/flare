//import { insert_message } from "../../../utils/db.js"
const nodemailer = require("nodemailer");

export default async function(req, res) {
	if(req.body.message && req.body.reply_to)
		await send_mail(req.body.message, req.body.reply_to, req.body.subject)
			.then(() => {
				req.body.submited = true
				res?.status(202).end()
			})
			.catch(() => {
				req.body.error = true
				res?.status(503).end()
			})
	}

export function send_mail(message, reply_to, subject) {
	if(
		message &&
		"/^[^@ ]+@[^@ ]+$/".test(reply_to)
	){
		// TODO do not create transporter each time
		/*let transporter = nodemailer.createTransport({ // TODO add all param
			service: "Outlook365",
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD,
			},
		});

		var mail = {
			from: "",
			to: process.env.MAIL_USER,
			replyTo: reply_to,
			subject: subject,
			text: message,
			//html: "<p>HTML version of the message</p>"
		};

		return transporter.sendMail(mail)*/
		return new Promise((resolve, reject) => {
			resolve("message is falsy or reply_to is incorrecte")
	})
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