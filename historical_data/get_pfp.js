const fs = require('fs');
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.SLACKAPIKEY, {
   // logLevel: LogLevel.DEBUG
});
//get pfps from all messa, WebClientges

//get all unique users

let allMessages = fs.readFileSync('allMessages.ndjson', 'utf-8').split('\n').map((message) => {
    return JSON.parse(message);
});
let users = allMessages.map((message) => {
    return message.user;
});
let uniqueUsers = [...new Set(users)];

//get all pfps
let allPfps = [];
uniqueUsers.forEach((user) => {
    client.users.info({
        user: user
    }).then((response) => {
        let user = response.user;
        allPfps.push({
            user: user.id,
            display_name: user.profile.display_name_normalized,
            pfp: user.profile.image_72
        });
        console.log({
            user: user.id,
            pfp: user.profile.image_72
        })

        if(allPfps.length === uniqueUsers.length){
            fs.writeFileSync('allPfps.ndjson', allPfps.map((pfp) => {
                return JSON.stringify(pfp);
            }).join('\n'));
        }
    });
});

console.log('total unique users:', uniqueUsers.length);