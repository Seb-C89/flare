const nodemailer = require("nodemailer");
import { sealData } from "iron-session";

export default async function(req, res) {
	if(req?.body?.email)
		await send_mail(req.body.email, req.body?.from)
			.then(() => {
				req.body.submited = true
				res?.status(202).end()
			})
			.catch((e) => {
				console.log(e)
				req.body.error = true
				res?.status(503).end()
			})
	else
		res?.status(503).end()
}

export async function send_mail(email, from) {
	if(/^[^@ ]+@[^@ ]+$/.test(email)){
		
		// Seal
		const seal = await sealData(	{	mail_perm: true,
											mail: email,
											from: from	},
										{	password: process.env.SEAL_PASSWORD })
							.catch((e) => console.log(e))
		
		let transporter = nodemailer.createTransport({ // TODO add all param
			service: process.env.MAIL_HOST,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD,
			},
		});

		var mail = {
			from: process.env.MAIL_USER,
			to: email,
			subject: process.env.ADRESSE,
			text: `Ce lien permet de vérifier votre adresse et d'accéder aux formulaires du site (contact / participez): ${process.env.ADRESSE}${from}?mail=${seal}\nMerci de l'interet que vous nous portez.`,
			html: `<p>Ce lien permet de vérifier votre adresse et d'accéder aux formulaires du site (contact / participez): <a href="${process.env.ADRESSE}${from}?mail=${seal}">${process.env.ADRESSE}</a></p><p>Merci de l'interet que vous nous portez.</p>`
		};

		return transporter.sendMail(mail)
	} 
	else 
		return new Promise((resolve, reject) => {
			reject("message is falsy or reply_to is incorrecte")
		})
}
