const keyRules = "ð Rules";
const check = "ð§§Join Give-Away";
module.exports = {
  step1: "Join CryptoATrade Channel on Telegram",
  check,
  keyPoint: "ð¿ï¸ Points",
  keyRules,
  desRules: `Introducing CryptoATrade Community with rewards!
To celebrate the development of the community, CryptoATrade launches a campaign for community's support.
Please follow the steps below to get the reward:
\n1) All participants (including those invited by others) have to complete the task in order to join the campaign.
Those invited by others also have to complete the tasks so that inviters can get points.
2) Rewards are given based on your points, which means that the more points you get, the more valuable reward you gain.
\n(This activity is just related to CryptoATrade Community)

\nð¢ How to win:
1) Find @CryptoATradeBot on Telegram and /start to start the bot and follow the guidance;
2) You can require or invite your friends to join by clicking your referral link;
3) Those you invite can get points after completing the tasks and be active in CryptoATrade Community.`,

  startStep: (user) => {

    return `Hello ${user}, I'm your friendly Crypto Alpha Trade & PUMP Give-Away Bot ð¤

  ðð¥ Top 20 Referral's Reward's in USDT (TRC20)
  
  1ï¸â£  $100
  
  2ï¸â£  $80
  
  3ï¸â£  $60
  
  4ï¸â£  $50
  
  5ï¸â£  $40
  
  6ï¸â£âð $20
  
  1ï¸â£1ï¸â£â2ï¸â£0ï¸â£  $10
  
   
  
  ðBy Participating You agree To Crypto Alpha Trade & PUMP Give-Away( Contest ) Program Term's and Condition's.
  
  \nð¢ Click the link below to Join the *CryptoATrade* Channel on Telegram.
  \nð¢ Then, click "ð§§Join Give-Away" to proceed`

  },

  done: (id) => {
    return `ð Congratulations you have completed the task.

    \nð Here is your referral link https://t.me/CryptoATradeBot?start=${id}
    
    \nð¥ To win the contest and receive the award please refer as many persons as you can to participate using the referral link.
    
    \nð For each person you invite, you will get a point.

    \n*â ï¸â ï¸â ï¸âNOTE: If you LEAVE and DELETE the Crypto Alpha Trade & Pump Telegram Channel, you will be DISQUALIFIED from the contest!"*
  
    
    \n*ðWinnersð will be announced and contacted!!!\n\n*`

  },

  teleNotFollow: "You haven't follow chanel telegram",
  teleNotJoin: "You haven't join group telegram",
}