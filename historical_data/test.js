// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACKAPIKEY, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});

// Find conversation ID using the conversations.list method
async function findConversation(name) {
// Store conversation history
let conversationHistory;
// ID of channel you watch to fetch the history for
let channelId = "C07443MC9UP";

try {

    await client.conversations.join({
       channel: channelId 
    })
  // Call the conversations.history method using WebClient
  const result = await client.conversations.history({
    channel: channelId,
    limit: 10
  });

  conversationHistory = result.messages;

  // Print results
  console.log(conversationHistory.length + " messages found in " + channelId);
}
catch (error) {
  console.error(error);
}
}

// Find conversation with a specified channel `name`
findConversation("thewishingwallbrick");