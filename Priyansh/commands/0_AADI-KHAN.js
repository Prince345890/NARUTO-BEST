const fs = require("fs");
module.exports.config = {
        name: "jan",
    version: "1.0.1",
        hasPermssion: 0,
        credits: "AADI BABU", 
        description: "hihihihi",
        commandCategory: "no prefix",
        usages: "RuhaNi",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
        var { threadID, messageID } = event;
        if (event.body.indexOf("jan")==0 || event.body.indexOf("Jaan")==0 || event.body.indexOf("Janu")==0 || event.body.indexOf("JAAN")==0) {
                var msg = {
                                body: "=𝐎𝐰𝐧𝐞𝐫 ➻  𝐀𝐘𝐄𝐒𝐇𝐀 𝐊𝐄 𝐇𝐀𝐒𝐁𝐄𝐍𝐃 𝐉𝐈😍 \n__________________________________\n\n𝐀𝐘𝐄𝐒𝐇𝐀 𝐊𝐇𝐀𝐍 𝐘𝐄 𝐑𝐇𝐈 𝐀𝐀𝐏𝐊𝐈 𝐉𝐀𝐀𝐍 𝐀𝐀𝐏𝐒𝐄 𝐆𝐀𝐋𝐄 𝐌𝐈𝐋𝐓𝐄 𝐇𝐔𝐘𝐄 𝐉𝐀𝐎 𝐑𝐎𝐎𝐌 𝐌𝐄 𝐀𝐁🙈🙈👇👇👇\n__________________________________ ",
                                attachment: fs.createReadStream(__dirname + `/noprefix/received_1748994859224273.jpeg`)
                        }
                        api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😳", event.messageID, (err) => {}, true)
                }
        }
        module.exports.run = function({ api, event, client, __GLOBAL }) {

        }
