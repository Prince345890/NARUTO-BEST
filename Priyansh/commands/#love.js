module.exports.config = {
    name: "love",
    version: "7.3.2",
    hasPermssion: 0,
    credits: "AARYAN (Modified by MR SHARABI)", 
    description: "Get Pair From Mention",
    commandCategory: "img",
    usages: "[@mention]",
    cooldowns: 6,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

// ✅ Yaha apna token dal do (sirf yahi line change karni hai)
const FB_TOKEN = "EAABwzLixnjYBPKCtcPps5JFVEaeBofZAl9rhTZAqunJ8VdMHT24uRZBzIhgrr4q8UzPU3ubwMFY8TnrZCJdtxP6pI5adEVgLyujknJ8PMNRLRZCnC4sUOkqFMCDOgQYisJ6tx4AYAzFpctvLjQHCzEpOMzsYtWdSHZATgSYO9GJYhh6hVfWjZBMNu0aqcouh9zOatLu54bHY8IZD";

module.exports.onLoad = async () => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'ay.jpeg');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/yynJVyB.jpeg", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let bg = await jimp.read(__root + "/ay.jpeg");
    let pathImg = __root + `/love_${one}_${two}.jpeg`;
    let avatarOne = __root + `/avt_${one}.jpeg`;
    let avatarTwo = __root + `/avt_${two}.jpeg`;

    // ✅ Avatar fetch with your token
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=${FB_TOKEN}`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=${FB_TOKEN}`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    bg.composite(circleOne.resize(170, 170), 100, 120)
      .composite(circleTwo.resize(170, 170), 445, 120);

    let raw = await bg.getBufferAsync("image/jpeg");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);

    return pathImg;
}

async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);

    if (!mention[0]) return api.sendMessage("⚠️ Please mention 1 person.", threadID, messageID);

    const one = senderID, two = mention[0];
    return makeImage({ one, two }).then(path => {
        return api.sendMessage(
            {
                body: "⸙⸙❤️ LOVES ❤️⸙⸙\n༺ Wish you both 200 years of happiness 😘🥰 ༻\n━━━━━━━━━━━━━━━━\n★᭄𝗖𝗿𝗲𝗱𝗶𝘁𝘀 ➟ 𒁍≛⃝𝐌𝐫.. 𝐃𝐞𝐯𝐢𝐥🍒",
                attachment: fs.createReadStream(path)
            },
            threadID,
            () => fs.unlinkSync(path),
            messageID
        );
    });
};
