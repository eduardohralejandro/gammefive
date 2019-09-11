const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const { check, validationResult } = require('express-validator');
router.get('/api', async (req, res) => {
	await res.status(200).send({ express: 'Express app' });
});

router.post('/api/contact', async (req, res) => {
	const errors = validationResult(req);

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const email = req.body.email;
	const name = req.body.name;
	const message = req.body.message;

	const msg = {
		to: process.env.GAMMEFIVE_EMAIL,
		from: email,
		subject: 'Email from gammefive',
		text: `name: ${name};
		 email:${email}; message:${message}`
	};

	await sgMail
		.send(msg)
		.then(result => {
			res.status(200).send(result);
		})
		.catch(error => {
			res.status(400).send(error);
		});
});

module.exports = router;
