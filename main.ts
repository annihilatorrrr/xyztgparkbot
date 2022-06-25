import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { serve } from "https://deno.land/x/sift@0.5.0/mod.ts";
import {
    Bot,
    GrammyError,
    HttpError,
    webhookCallback,
} from "https://deno.land/x/grammy@v1.9.0/mod.ts";
import { apiThrottler } from "https://deno.land/x/grammy_transformer_throttler@v1.1.2/mod.ts";

const TOKEN = String(Deno.env.get("TOKEN"));
const TOKEN2 = String(Deno.env.get("TOKEN2"));
const TOKEN3 = String(Deno.env.get("TOKEN3"));
const TOKEN4 = String(Deno.env.get("TOKEN4"));
const URI = String(Deno.env.get("URI"));
const bot = new Bot(TOKEN);
const bot2 = new Bot(TOKEN2);
const bot3 = new Bot(TOKEN2);
const bot4 = new Bot(TOKEN2);
bot.api.config.use(apiThrottler());
const handleUpdate = webhookCallback(bot, "std/http");
bot2.api.config.use(apiThrottler());
const handleUpdate2 = webhookCallback(bot2, "std/http");
bot3.api.config.use(apiThrottler());
const handleUpdate3 = webhookCallback(bot3, "std/http");
bot4.api.config.use(apiThrottler());
bot4.api.setWebhook(URI + TOKEN4).then(r => console.log(r));
const handleUpdate4 = webhookCallback(bot4, "std/http");
const stm = "Here's a full featured channel management bot for you @Sagiribot; use it!"

bot.on("message", async (ctx) => {
    return await ctx.reply(stm)
});
bot2.on("message", async (ctx) => {
    return await ctx.reply(stm)
});
bot3.command("start", async (ctx) => {
    return await ctx.reply(stm)
});
bot4.on("message", async (ctx) => {
    return await ctx.reply("SHIFTED TO @SAGIRIBOT!")
});

bot.catch((err) => {
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});
bot2.catch((err) => {
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});
bot3.catch((err) => {
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});
bot4.catch((err) => {
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

console.log("Started!");
serve({
    ["/" + TOKEN]: async (req) => {
        if (req.method == "POST") {
            try {
                return await handleUpdate(req);
            } catch (err) {
                console.error(err);
            }
        }
        return new Response();
    },
    ["/" + TOKEN2]: async (req) => {
        if (req.method == "POST") {
            try {
                return await handleUpdate2(req);
            } catch (err) {
                console.error(err);
            }
        }
        return new Response();
    },
    ["/" + TOKEN3]: async (req) => {
        if (req.method == "POST") {
            try {
                return await handleUpdate3(req);
            } catch (err) {
                console.error(err);
            }
        }
        return new Response();
    },
    ["/" + TOKEN4]: async (req) => {
        if (req.method == "POST") {
            try {
                return await handleUpdate4(req);
            } catch (err) {
                console.error(err);
            }
        }
        return new Response();
    },
    "/": () => {
        return new Response("Ok!\n@Memers_Gallery!");
    },
});
