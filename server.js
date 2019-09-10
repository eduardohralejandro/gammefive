const express = require('express');
const cors = require('cors');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
require('dotenv').config();

//
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
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
			console.log(res);
			res.send(result);
			//
		})
		.catch(error => {
			console.log('error', error);
		});
});

// // API calls // testing express app
app.get('/api', async (req, res) => {
	await res.send({ express: 'Express app' });
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(port, () => console.log(`Listening on port ${port}`));
