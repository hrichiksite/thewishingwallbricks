const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.SLACKAPIKEY, {
   // logLevel: LogLevel.DEBUG
});
  const fs = require('fs');

let channelFetchId = "C07443MC9UP";

let cursor;
let has_more;
async function iterateOverMessages(channelId) {
    let conversationHistory;
    //get all messages in a channel
    try {
        const result = await client.conversations.history({
            channel: channelId,
            cursor,
            limit: 999
        });
        conversationHistory = result.messages;
        cursor = result.response_metadata.next_cursor;
        has_more = result.has_more;
        console.log('Got' + conversationHistory.length + 'messages');
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

async function saveMessages(){
    let result = await iterateOverMessages(channelFetchId);
    let allMessages = result.messages;
    //save all messa ges to a file ndjson
    let savedata = allMessages.map((message) => {
        return JSON.stringify({
            ts: message.ts,
            user: message.user,
            text: message.text,
            reactions: message.reactions,
        });
    }).join('\n');
    fs.appendFileSync('allMessages.ndjson', savedata);
    fs.writeFileSync('cursor.json', JSON.stringify({cursor}));
} 

(async () => {
    await saveMessages();
    while(has_more){
        await saveMessages();
    }
    console.log('All messages saved');
})();
