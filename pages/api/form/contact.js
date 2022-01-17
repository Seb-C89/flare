//import { insert_message } from "../../../utils/db.js"
const nodemailer = require("nodemailer");

export default async function(req, res) {
	const { message, reply_to, subject } = req.body
	console.log(req.body)
	console.log(message)
	console.log(reply_to)

	// TODO check message, reply_to, subject
	
	await send_mail(message, reply_to, subject)
		.then(() => {
			return res.status(202).end()
		})
		.catch(() => {
			return res.status(503).end()
		})
}

export function send_mail(message, reply_to, subject) {
	// TODO check params

	let transporter = nodemailer.createTransport({ // TODO add all param
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

	return transporter.sendMail(mail)
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