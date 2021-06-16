const keyRules = "📌 Rules";
const check = "🧧Join Give-Away";
module.exports = {
  step1: "Join CryptoATrade Channel on Telegram",
  check,
  keyPoint: "🅿️ Points",
  keyRules,
  desRules: `Introducing CryptoATrade Community with rewards!
To celebrate the development of the community, CryptoATrade launches a campaign for community's support.
Please follow the steps below to get the reward:
\n1) All participants (including those invited by others) have to complete the task in order to join the campaign.
Those invited by others also have to complete the tasks so that inviters can get points.
2) Rewards are given based on your points, which means that the more points you get, the more valuable reward you gain.
\n(This activity is just related to CryptoATrade Community)

\n📢 How to win:
1) Find @CryptoATradeBot on Telegram and /start to start the bot and follow the guidance;
2) You can require or invite your friends to join by clicking your referral link;
3) Those you invite can get points after completing the tasks and be active in CryptoATrade Community.`,

  startStep: (user) => {

    return `Hello ${user}, I'm your friendly Crypto Alpha Trade & PUMP Give-Away Bot 🤖

  🏆👥 Top 20 Referral's Reward's in USDT (TRC20)
  
  1️⃣  $100
  
  2️⃣  $80
  
  3️⃣  $60
  
  4️⃣  $50
  
  5️⃣  $40
  
  6️⃣➖🔟 $20
  
  1️⃣1️⃣➖2️⃣0️⃣  $10
  
   
  
  📝By Participating You agree To Crypto Alpha Trade & PUMP Give-Away( Contest ) Program Term's and Condition's.
  
  \n📢 Click the link below to Join the *CryptoATrade* Channel on Telegram.
  \n📢 Then, click "🧧Join Give-Away" to proceed`

  },

  done: (id) => {
    return `🎉 Congratulations you have completed the task.

    \n🔗 Here is your referral link https://t.me/CryptoATradeBot?start=${id}
    
    \n👥 To win the contest and receive the award please refer as many persons as you can to participate using the referral link.
    
    \n👏 For each person you invite, you will get a point.

    \n*⚠️⚠️⚠️“NOTE: If you LEAVE and DELETE the Crypto Alpha Trade & Pump Telegram Channel, you will be DISQUALIFIED from the contest!"*
  
    
    \n*🏆Winners🏆 will be announced and contacted!!!\n\n*`

  },

  teleNotFollow: "You haven't follow chanel telegram",
  teleNotJoin: "You haven't join group telegram",
}