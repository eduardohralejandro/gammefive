const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

router.get('/api', async (req, res) => {
	await res.status(200).send({ express: 'Express app' });
});

router.post('/api/contact', async (req, res) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const msg = {
		to: process.env.GAMMEFIVE_EMAIL,
		from: req.body.email,
		subject: 'Email from gammefive',
		text: `Name: ${req.body.firstName} ${req.body.lastName};
		 Email:${req.body.email}`
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
