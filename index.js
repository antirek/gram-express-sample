const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const express = require("express");
const config = require("config");

const createApp = ({telegramClient}) => {
  const app = express();  

  app.get('/:phone', async (req, res) => {
    const {phone} = req.params;

    const result = await telegramClient.invoke(
      new Api.contacts.ImportContacts({
        contacts: [
          new Api.InputPhoneContact({
            clientId: BigInt("25798624232579869"),
            phone,
            firstName: "15556",
            lastName: "235556",
          }),
        ],
      })
    );
    console.log(result);
    
    res.json({status: 'OK'});
  })

  app.get('/', (req, res) => {
    res.send('Hello World!');

  })

  return app;
}

const apiId = config.apiId;
const apiHash = config.apiHash;
const stringSession = new StringSession(config.stringSession);

const telegramClient = new TelegramClient(stringSession, apiId, apiHash, {});
const app = createApp({telegramClient});

const start = async () => {
  await telegramClient.connect();
  app.listen(config.port, () => {
    console.log('start with config', config);
  });
};


(start)();

