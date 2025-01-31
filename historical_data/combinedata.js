const fs = require('fs');

let allMessages = fs.readFileSync('allMessages.ndjson', 'utf-8').split('\n').map((message) => {
    return JSON.parse(message);
});

let allPfps = fs.readFileSync('allPfps.ndjson', 'utf-8').split('\n').map((pfp) => {
    return JSON.parse(pfp);
});

let combinedData = allMessages.map((message) => {
    let userPfp = allPfps.find((pfp) => {
        return pfp.user === message.user;
    });

    //remove users from reaction array objects
    if(message.reactions){
        message.reactions.forEach((reaction) => {
            reaction.users = undefined;
        });
        //get upvotes
        message.upvotes = message.reactions.reduce((acc, reaction) => {
            if(reaction.name === 'upvote'){
                return acc + reaction.count;
            }
            return acc;
        }, 0);
    }
    return {
        ts: message.ts.replace('.', '_'),
        user: message.user,
        text: message.text,
        reactions: message.reactions,
        upvotes: message.upvotes,
        pfp: userPfp.pfp,
        display_name: userPfp.display_name
    };
});

fs.writeFileSync('combinedData.ndjson', combinedData.map((message) => {
    return JSON.stringify(message);
}).join('\n'));

console.log('Combined data saved');