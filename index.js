const fetch = require('node-fetch');
var random = require('random-name');
const chalk = require('chalk');
const moment = require('moment');

const functionCreateTask = () => new Promise((resolve, reject) => {
    const bodys = {
        "clientKey":"",
        "task":
        {
            "type":"RecaptchaV2TaskProxyless",
            "websiteURL":"https://fidato.hypersign.id/app/form/totm-x--hid-community-giveaway?referrer=syahrul9088%40gmail.com",
            "websiteKey":"6LeKIM4ZAAAAAC23tPRa8Ut0MFF2FFN61wl0ihVZ",
        }
     } 
   
       fetch('http://api.anti-captcha.com/createTask', { 
        method: 'POST', 
        body: JSON.stringify(bodys)
       })
       .then(res => res.json())
       .then(result => {
           resolve(result);
       })
       .catch(err => reject(err))
});

const functionResult = (task) => new Promise((resolve, reject) => {
    const bodys = {
        "clientKey":"3ce12fbabc8d18f560abd2416b04be2e",
        "taskId": task
     } 
   
       fetch('https://api.anti-captcha.com/getTaskResult ', { 
        method: 'POST', 
        body: JSON.stringify(bodys)
       })
       .then(res => res.json())
       .then(result => {
           resolve(result);
       })
       .catch(err => reject(err))
});

const functionRegist = (resCaptcha) => new Promise((resolve, reject) => {

    const bodys = {
        did: `did:hs:51b5da53-b5f9-4ee4-a918-227b1ebed2a2`,
        email: `tyomalkafern@mailboxvip.com`,
        ethAddress: "0x12BB890508c125661E03b09EC06E404bc9289040",
        hasJoinedTGgroup: true,
        hasTwitted: true,
        name: `${random.first()} ${random.last()}`,
        projectId: "61570e4d668e266d13222604",
        telegramHandle: "Rulggwp",
        tweetUrl: "https://twitter.com/kautsar908/status/1441998715602960387",
        twitterHandle: "kautsar908"
     } 

    fetch(`https://ssi.hypermine.in/whitelist/api/v1/investor?rcToken=${resCaptcha}&referrer=tyomalkafern@mailboxvip.com`, {
        method: "POST",
        body: JSON.stringify(bodys),
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'id-ID,id;q=0.9',
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU3lhaHJ1bCBHdW5hd2FuIiwiZW1haWwiOiJzeWFocnVsOTA4OEBnbWFpbC5jb20iLCJpZCI6ImRpZDpoczozN2NlYzc2Ny1lMTM0LTRkYzYtYmYyYS01OWIxZDBjYTMyOWQiLCJpYXQiOjE2MzM0MDc1NDgsImV4cCI6MTYzMzUyNzU0OH0.te3-GZ04MgSPyVZdqsIY0XfNupVKh8Lq-eoY-W1q4bI',
            'content-length': 373,
            'content-type': 'application/json',
            'origin': 'https://fidato.hypersign.id',
            'referer': 'https://fidato.hypersign.id/',
            'sec-ch-ua': `"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"`,
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': "Windows",
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

(async () => {

    

    try {

        for (var i = 0; i < 100; i++){
            console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Wait for captcha...`))

            const getTask = await functionCreateTask()
            const task = getTask.taskId
            do{
                var getResult = await functionResult(task)
                if(getResult.status != 'processing'){
                    console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Captcha is ready`))
                }
            } while(getResult.status == 'processing')

            const resCaptcha = getResult.solution.gRecaptchaResponse

            console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Wait for register..`))

            const signup = await functionRegist(resCaptcha)

            console.log(signup)
            
            if(signup.message == 'Whitelisting credential has been successfully sent to the investor email'){
                console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Regist success | ${signup.message}\n`))
            } else {
                console.log(chalk.red(`[${(moment().format('HH:mm:ss'))}] Regist failed\n`))
            }
        }
    } catch (e) {
        console.log(chalk.red(`[${(moment().format('HH:mm:ss'))}] Error : ${e}\n`))
    }
})();
