import SibApiV3Sdk from 'sib-api-v3-sdk';
const defaultClient = SibApiV3Sdk.ApiClient.instance;
import dotenv from 'dotenv';
dotenv.config();

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_TOKEN;
const sendTo = process.env.SEND_TO;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

const sendEmail = (req, res) => {
  const data = req.body;
  const dataToSend = {
    sender: {
      name: `${data.firstname} ${data.lastname}`,
      email: data.email,
    },
    subject: 'Vous avez reçu un nouveau message depuis Spoon and Pillow',
    htmlContent: `<html>
				<head>
				</head>
						<body>
							<h2>Bonjour Marion,</h2>
							<p>Vous avez reçu un nouveau message de ${data.firstname} ${data.lastname} ($[])</p>
							<p>Voici son contenu :</p>
							<p>${data.message}</p>
						</body>
			</html>`,
    to: [
      {
        email: sendTo,
        name: 'Marion Leclerc',
      },
    ],
    params: {
      name: 'John',
      surname: 'Doe',
    },
  };
  apiInstance.sendTransacEmail(dataToSend).then(
    function (data: any) {
      res.sendStatus(200);
    },
    function (error: any) {
      res.sendStatus(500);
      throw new Error('error');
    }
  );
};

export { sendEmail };
