require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const {
  getInfoMem,
  // getIDTwitter,
  createMember,
  updateMember,
  getStepInputCurrent,
  checkUniqueTwitter,
  getWalletAddress,
  getPointRef,
  STEP_USERNAME,
  STEP_WALLET,
  STEP_NONE
} = require('./model');

const listText = require('./listText');

const token = process.env.TOKEN;
const linkGroupTele = process.env.LINK_GROUP;

const IDGroupTele = process.env.ID_GROUP;

const EVENT_CHECK_MISSION = 'check_mission';
const EVENT_USERNAME = 'username_twitter';

const bot = new TelegramBot(token, { polling: true });

process.on('unhandledRejection', function (error, p) {
	console.log("\x1b[31m","Error: ", error.message, "\x1b[0m");
});

const keyboards = {
  main: {
    inline_keyboard: [
     
      [{ 'text': listText.step1, "url": linkGroupTele }],
//       [{ 'text': listText.check, 'callback_data': EVENT_CHECK_MISSION }],

    ],
  },
  done: {
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      keyboard: [
        [listText.keyPoint, listText.keyRules],
      ]
    },
    parse_mode: "Markdown"
  }
};

bot.onText(/\/start/, async (msg) => {
  if (msg.from.is_bot) {
    return;
  }
  const ref = msg.text.replace("/start", "").trim();
  const result = await createMember({ ...msg.from, ref, captcha: '' });
  if (result === 'done') {
    return bot.sendMessage(msg.chat.id, listText.done(msg.from.id), keyboards.done);
  }
  return bot.sendMessage(msg.chat.id, listText.startStep(msg.from.first_name), { reply_markup: keyboards.main });
})

// validate enter text username and wallet
bot.onText(/\.*/, async (msg) => {
  const step = await getStepInputCurrent(msg.from.id);
  if (step == STEP_NONE) return;

  if (step == STEP_USERNAME) {

    if (msg.text[0] != "@") {
      return bot.sendMessage(msg.chat.id, listText.validTwiiter);
    }

    const isDuplicate = await checkUniqueTwitter(msg.text);
    if (isDuplicate) return bot.sendMessage(msg.chat.id, listText.duplicateTw);

    await bot.sendMessage(
      msg.chat.id,
      listText.accTwOk(msg.text),
      { parse_mode: "Markdown" }
    )
    await updateMember(
      msg.from.id,
      { step_input: STEP_NONE, username_twitter: msg.text }
    );
    return;
  }

  if (step == STEP_WALLET) {
    if (!(/^(0x){1}[0-9a-fA-F]{40}$/i.test(msg.text))) {
      return bot.sendMessage(msg.chat.id, listText.validWallet)
    }

    await bot.sendMessage(msg.chat.id, listText.walletOk(msg.text), keyboards.done)

    await updateMember(
      msg.from.id,
      { step_input: STEP_NONE, wallet_address: msg.text }
    );
    return;
  }
});


const checkJoinGr = async (userId) => {
  try {
    const result = await bot.getChatMember(IDGroupTele, userId);
    if (result.status !== 'kicked' && result.status !== "left") return { status: true, message: '' };
    return { status: false, message: listText.teleNotJoin };
  } catch (error) {
    return { status: false, message: listText.teleNotJoin };
  }
}




async function checkStep(userId, msg) {

  const listStepDone = {
    0: { status: true, message: '' },
  };


  
  const tempStep = {
    inline_keyboard: [
      [{ 'text': listText.step1, "url": linkGroupTele }],
      [{ 'text': listText.check, 'callback_data': EVENT_CHECK_MISSION }],
    ]
  };

  const result = { status: true, message: ''};

    if (listStepDone[0].status) {
      tempStep.inline_keyboard[0][0].text += ' ✅'
    } else {
      tempStep.inline_keyboard[0][0].text += ' ❌'
      if (result.status) {
        result.status = listStepDone[0].status;
        result.message = listStepDone[0].message;
      }
    }
  
  bot.editMessageReplyMarkup(tempStep, { chat_id: msg.chat.id, message_id: msg.message_id })
  return result;
}

bot.on("callback_query", async (callbackQuery) => {
  const { id, message, data, from } = callbackQuery;
  const msg = { chat: { id: message.chat.id }, from}
  const info = await findOrCreate(msg);
  if (!info) return;
  if (info.is_done) {
    bot.answerCallbackQuery(id);
    return bot.sendMessage(message.chat.id, listText.done(from.id), keyboards.done);
  }
  if (data == EVENT_CHECK_MISSION) {
    const result = await checkStep(from.id, message);
    if (!result.status) {
      return bot.answerCallbackQuery(id, { text: result.message });
    }
    await updateMember(from.id, { is_done: 1 });
    return bot.sendMessage(message.chat.id, listText.done(from.id), keyboards.done);
  }
  if (data == EVENT_USERNAME) {
    bot.sendMessage(message.chat.id, listText.enterTw);
    await updateMember(from.id, { step_input: STEP_USERNAME });
    bot.answerCallbackQuery(id);
    return;
  }
});

// =============== list event keyboard
bot.onText(new RegExp(listText.keyPoint), async (msg) => {
  const info = await findOrCreate(msg);
  if (!info) return;
  if (info.step_input != STEP_NONE) {
    await updateMember(msg.from.id, { step_input: STEP_NONE });
  }
  const listStepDone = {
    0: { status: true, message: '' },
    // 1: await checkJoinGr(msg.from.id),
    // 2: await checkStepTwitter(msg.from.id),
    1: { status: true },
  };
  let taskPoint = 0;
  Object.keys(listStepDone).forEach((key) => {
    if (listStepDone[key].status) taskPoint += 1;
  })
  const refPoint = await getPointRef(msg.from.id);

 
  return bot.sendMessage(
    msg.chat.id,
    `User ID = ${info.id_telegram}
  \nReferral Points = ${refPoint}
Referral link = https://t.me/CryptoATrade?start=${info.id_telegram}

\nℹ️ For each person you invite and he/she completed tasks, you will get a referral point.`,
    keyboards.done
  );
})

bot.onText(new RegExp(listText.keyHelp), async (msg) => {
  const info = await findOrCreate(msg);
  if (!info) return;
  if (info.step_input != STEP_NONE) {
    await updateMember(msg.from.id, { step_input: STEP_NONE });
  }
  return bot.sendMessage(msg.chat.id, listText.desHelp, keyboards.done);
})

bot.onText(new RegExp(listText.keyRules), async (msg) => {
  const info = await findOrCreate(msg);
  if (!info) return;
  if (info.step_input != STEP_NONE) {
    await updateMember(msg.from.id, { step_input: STEP_NONE });
  }
  return bot.sendMessage(msg.chat.id, listText.desRules, keyboards.done);
})



async function findOrCreate(msg) {
  const info = await getInfoMem(msg.from.id);
  if (!info) {
    createMember({ ...msg.from, ref: '', captcha: '' });
    await bot.sendMessage(msg.chat.id, listText.startStep, { reply_markup: keyboards.main });
    return false;
 
 }
  return info;
} 
