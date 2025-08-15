module.exports.config = {
  name: "boydp",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "DEVIL SHARABI",
  description: "Send random boy DP photo with yes/no confirm (safe upload & retry)",
  commandCategory: "Random-IMG",
  usages: "boydp",
  cooldowns: 2,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const prompt = "Abe Yaar Pura Command To Likh Le 😹 ckbot Yes Or Not ? (reply: yes / no)";
  const commandName = module.exports.config.name;

  api.sendMessage(prompt, event.threadID, (err, info) => {
    if (err) return;
    global.client.handleReply.push({
      name: commandName,
      messageID: info.messageID,
      author: event.senderID,
      type: "confirm"
    });
  }, event.messageID);
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  if (handleReply.type !== "confirm" || event.senderID !== handleReply.author) return;

  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const { join } = require("path");

  const msg = (event.body || "").trim().toLowerCase();
  if (msg !== "yes" && msg !== "no") return;

  if (msg === "no") {
    return api.sendMessage("Thik hai, cancel kar diya 😏", event.threadID, () => {}, handleReply.messageID);
  }

  // YES: download & send image
  // Yahan naye links daale gaye hain
  const links = [
    "https://i.ibb.co/fz6GmvCT/962d845bb734c3cb75a5dc28e455f0c3.jpg",
    "https://i.ibb.co/rGVpzncY/25cfcbfa7e6bfb9c810dbecd60e9c6de.jpg",
    "https://i.ibb.co/9myXmTvL/ca2a5dc2b9b93557917edc4b7f05ce2c.jpg",
    "https://i.ibb.co/P27vR4t/bcd2b3a1fc987167df5b8f9528252a88.jpg",
    "https://i.ibb.co/21qsch3H/e40d0c740967175d4eddc8b6767b41c9.jpg",
    "https://i.ibb.co/tw4zVz8Z/817510cad9fc0710e6bcbc38384c77cf.jpg",
    "https://i.ibb.co/d48JW9Gh/9c6fb505e07d4f37add2a252078ab147.jpg",
    "https://i.ibb.co/p6gpTJV/9e1cdce1517d21e3010f4827cef0cc3a.jpg",
    "https://i.ibb.co/tMby0DQ/264732abf92155e4047d47a76b476762.jpg",
    "https://i.ibb.co/Xr1K6ssK/99f6602c825e90b55c4ab95e383231d9.jpg",
    "https://i.ibb.co/rRgd3DTZ/0a778f157a71a105e6f9e689e906574c.jpg",
    "https://i.ibb.co/BVzGW5yb/78f9892d6e74b5024507fa8266b82be5.jpg",
    "https://i.ibb.co/SXNpFbkp/ca1ce6e798fd178c15facd2fea890306.jpg",
    "https://i.ibb.co/fWhV4Jp/645429da8eb7effe07551b6b2fddb307.jpg",
    "https://i.ibb.co/PGcxz0QJ/f6c013770313d079c87669e44b0855c0.jpg",
    "https://i.ibb.co/rfz6CWSF/46e75ab9828a6e51e97ec6f63009107e.jpg",
    "https://i.ibb.co/6Ry5RWnD/d0ef225729da996665b5f09f42447026.jpg",
    "https://i.ibb.co/SGgbnnf/7248bd36ffbf53c9819aa34001cbdb9f.jpg",
    "https://i.ibb.co/vxKqFxmL/46a2429a47e12915b83e61c1e0e7c0d0.jpg",
    "https://i.ibb.co/SXcR49VW/279e6329105d385826325007d2f5c524.jpg",
    "https://i.ibb.co/mFvpzJ1P/300dd20b49e320e2d8012d3a4bace900.jpg",
    "https://i.ibb.co/tT0SM8Xd/13a016edae1853f8d6b5fbd1025b9fa1.jpg",
    "https://i.ibb.co/S7wJCSZm/9ca6d8b7bbfc791028f3a004d5475519.jpg",
    "https://i.ibb.co/bMLNv5pp/99803280188356d75ff8e58c3cc13fa1.jpg",
    "https://i.ibb.co/MDKtg1Q2/18311f36ec0d3ea0164ec55bae6397f3.jpg",
    "https://i.ibb.co/TpJSRrY/680409c4172978e8b67f8828106c82dc.jpg",
    "https://i.ibb.co/23VjBpP1/84afad9d0553c4afbde222ae948252e3.jpg",
    "https://i.ibb.co/BHdLZ1K2/1054cadf710aba92510197fe4b94a535.jpg",
    "https://i.ibb.co/WNzhpQGZ/bae91bb412dd35e0a4da708603a9be47.jpg",
    "https://i.ibb.co/MkLW1DXP/62e8ae3be5f8ed79c8ba07aba5096b66.jpg",
    "https://i.ibb.co/N0L8FWt/44fb4775c4a7fc30c09c705d2e48b8ca.jpg",
    "https://i.ibb.co/wFW30kjL/7c2058b20c7a809db282439ab167215f.jpg",
    "https://i.ibb.co/PZjTDDFR/464024139151cd64388d137265cff45e.jpg",
    "https://i.ibb.co/JwZ1xgzR/90cecacbd2a4a20742be6ae318986850.jpg",
    "https://i.ibb.co/FbdXf5bY/c9a42cf8f08462b73ebd859e8606b7eb.jpg",
    "https://i.ibb.co/FGxNGQd/427df65a8eb4b9dcc4fdcdd9f70f0c4d.jpg",
    "https://i.ibb.co/PzNyjrkH/942388049edcd840dbd4fe5106ff8024.jpg",
    "https://i.ibb.co/fVDck71g/5933adb0b1a95ee2df101696a9c176ca.jpg",
    "https://i.ibb.co/dwyTZpxx/f34d420f07f32502d3a4ed7142885e43.jpg",
    "https://i.ibb.co/7dY702hK/98734ea90d493b0a93640bd7ad2413d2.jpg",
    "https://i.ibb.co/bgwNwjCW/e315f045821ee7f4c664d14e3de261a8.jpg",
    "https://i.ibb.co/5gsFHsSH/6295ad75f26327ca41f374fbac7673e6.jpg",
    "https://i.ibb.co/zWNXC7Nf/73aa0c9c7bc65d0d50f184e090ef7292.jpg",
    "https://i.ibb.co/ynzKHwmj/88b26aaee2874e7dd9a0ab9f1d45f0aa.jpg",
    "https://i.ibb.co/35qb1LyL/e1106bc0cc323a144fdc13dda1ec8569.jpg",
    "https://i.ibb.co/sJkfvT5V/ddc65c2fefd765b87cf5d9f2fd86df88.jpg",
    "https://i.ibb.co/JF2yvSTp/6a4d80bed92997687a7fce4564676f6b.jpg",
    "https://i.ibb.co/RTkynm58/d2ab518167d8e60eed5b0cbcb9f36744.jpg",
    "https://i.ibb.co/xqP7ZCMz/4280895eb945b5ca3928da2e54879220.jpg",
    "https://i.ibb.co/NnSq3KGj/510428a057d0f0daf44b37c5b7e5633a.jpg",
    "https://i.ibb.co/fGyyTLqK/4af03fe3e1ed6bc58b3164856c779b1d.jpg",
    "https://i.ibb.co/y25ZwQM/d63112828e7d482112a62d15943a5b79.jpg",
    "https://i.ibb.co/rGJnCBbT/59f8e3b93ebc14429838f8f3f593499d.jpg",
    "https://i.ibb.co/T59MXh7/50311747aefd8e7c0d9449364a7c6043.jpg",
    "https://i.ibb.co/HD19RVRb/b8a9e61599ff53600b04759963a11ae9.jpg",
    "https://i.ibb.co/Mx5BTR3F/44512226aef7fbe4cfceee6165d40ff1.jpg",
    "https://i.ibb.co/gZyTCsd5/29dc501311f9e6b7850de89cd8b4eada.jpg",
    "https://i.ibb.co/tM4dFDhC/b888c08328a8360465b3e47a2a0a6bb2.jpg",
    "https://i.ibb.co/sdv5RFqX/0e284df9467b5d9dd3b6a0a84789838c.jpg",
    "https://i.ibb.co/hF957vn4/e959348505faf71439673f124789724c.jpg",
    "https://i.ibb.co/S4gkyTzM/28c7dccd8bb801dc195b4954043ed411.jpg",
    "https://i.ibb.co/27TfN3VK/751bd0016871dd3a3531a7d739ef215d.jpg",
    "https://i.ibb.co/vCH3JMgy/1cb2a288682350fd11f97f6c8dd50ff0.jpg",
    "https://i.ibb.co/Kpht3Jts/0fef01cd54e55d1920e35b5ec02dba42.jpg",
    "https://i.ibb.co/FbzZZDzt/1ba96be7b035e73a592269450b6ddd91.jpg",
    "https://i.ibb.co/MmpmMx0/a757018ef3ea3567e904594234e3de7c.jpg",
    "https://i.ibb.co/BVBDT4KV/83636d3135c75eebca52e99bb0e5db0b.jpg",
    "https://i.ibb.co/mLZMhdV/4222eab5239c33c29c557bfff409739d.jpg",
    "https://i.ibb.co/rRpNMnQy/550ab8db723060049216a3243751214b.jpg",
    "https://i.ibb.co/sd99sT0L/9ef059dce814d0ec8fe08aa5157cbba5.jpg",
    "https://i.ibb.co/2332ccmN/06799bc2423dbd1cad747dfc48418c41.jpg",
    "https://i.ibb.co/HT00CxJT/a1d2ed0231f9bad6cd63a10c6c4549f7-1.jpg",
    "https://i.ibb.co/gMpTS6BK/130df17307b4f1802342ee8be0a8a5c7.jpg",
    "https://i.ibb.co/7xKRcWCX/6656d83bbe410f940e2b7324748cac41.jpg",
    "https://i.ibb.co/nM7sJbCN/98eabef22c99e685db4905f388f87ee2.jpg",
    "https://i.ibb.co/gFDkkSNb/3275b03000ff965947558bb1771ff01b.jpg",
    "https://i.ibb.co/XrJmMWtM/089827429742b78f236494d37661ec85.jpg",
    "https://i.ibb.co/23PBPGS5/43ca0b74285824fabf7179eaa401d01e.jpg",
    "https://i.ibb.co/6M8Zk4Z/5a5926bee15676529c63d0403c942623.jpg",
    "https://i.ibb.co/459fb985e03df5df65604ea42e5ef85e.jpg",
    "https://i.ibb.co/3GymHGj/48636eecffa98203d917c4da46b07086.jpg",
    "https://i.ibb.co/C5gDBYHM/472d342df9b88346e7ad0bd958d14916.jpg",
    "https://i.ibb.co/gMKdw5sk/c22092b8f7ef845dc167048e77efe004.jpg",
    "https://i.ibb.co/hJ17nMv1/31203bacb88121ba4b12044221d7c3ae.jpg",
    "https://i.ibb.co/wNbN7VZK/e9858fc25815a0aae384f678f2a9b52b.jpg",
    "https://i.ibb.co/1G7HYhzJ/444e5bc1915fc1ad0ed7239bcd6d319b.jpg",
    "https://i.ibb.co/YBMT9N7x/21716f51201e4bec9e8902813645348b.jpg",
    "https://i.ibb.co/tTy4SN6K/f5954679142ac11b2a21e37c64d97c53.jpg",
    "https://i.ibb.co/8DWWKc7G/1be293a2ef3b7a7fe6e357117d370d25.jpg",
    "https://i.ibb.co/Z6rY4NPz/0881869a9a427b20d28633c25a214475.jpg",
    "https://i.ibb.co/BVWLnbj8/b616d81a52cba8899882cdcae2ca86fc.jpg",
    "https://i.ibb.co/FkWBBw9Z/2cf1b961903fa90a2a40ec3ff4face72.jpg",
    "https://i.ibb.co/mrT4ghCN/e0cf3ffa8eaada3c50fb136d3774f082-1.jpg"
  ];

  const cacheDir = join(__dirname, "cache");
  fs.ensureDirSync(cacheDir);
  const filePath = join(cacheDir, `boydp_${Date.now()}.jpg`);
  const randomLink = links[Math.floor(Math.random() * links.length)];

  const sendWithRetry = async (attempt = 1) => {
    if (attempt > 3) {
      return api.sendMessage(`Arey, image download nahi ho pa rahi hai. Yeh lo link: ${randomLink}`, event.threadID, () => {}, handleReply.messageID);
    }

    try {
      const response = await axios({
        method: "GET",
        url: encodeURI(randomLink),
        responseType: "stream",
        timeout: 30000
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", (err) => {
            console.error("File write error:", err);
            reject(err);
        });
      });

      const stat = fs.statSync(filePath);
      if (!stat || stat.size <= 0) {
        throw new Error("Empty file or file not found.");
      }

      api.sendMessage({ 
          body: "💝 𝐌𝐚𝐝𝐞 𝐛𝐲 𝐃𝐞𝐯𝐢𝐥 𝐬𝐡𝐚𝐫𝐚𝐛𝐢 💖", 
          attachment: fs.createReadStream(filePath) 
      }, event.threadID, (err) => {
          fs.unlinkSync(filePath);
          if (err) {
            console.error("Facebook API send error:", err);
            return sendWithRetry(attempt + 1);
          }
      }, handleReply.messageID);

    } catch (e) {
      console.error("Image download/processing error:", e.message);
      fs.unlink(filePath, () => {});
      return sendWithRetry(attempt + 1);
    }
  };

  sendWithRetry();
};
