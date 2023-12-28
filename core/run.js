const API_BASE = config.apikey;
const URI = `${API_BASE}/v1/completions`;

const char = bot.char;
const CharInfo = bot.CharInfo;
const FirstMsg = bot.FirstMsg;

const user = "Juho";

const MAX_TOKENS_LIMIT = 6000;

function calculateTotalTokens() {
    return log.reduce((totalTokens, logEntry) => totalTokens + logEntry.length, 0);
}

function manageMemory() {
    while (calculateTotalTokens() > MAX_TOKENS_LIMIT) {
        const removedEntry = log.shift();
        console.log(`Removed entry due to token limit: ${removedEntry}`);
    }
}

const log = [`${char}:\n${FirstMsg}\n`];
async function run(text) {
    const request = {
        prompt: `${CharInfo}\n\n${log.join("")}${user}:\n${text}\n${char}:\n`,
        stop: [`${user}:`, `${char}:`],
        temperature: 0.9,
        top_p: 0.9,
        max_tokens: 250
    };

    try {
        const response = await fetch(URI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const result = (await response.json()).choices[0].text;
        log.push(`${user}:\n${text}\n${char}:\n${result}\n`);
        manageMemory();
        displayMessage(result, "ai-message");

        if (ttsEnabled) {
            speakText(result);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function addLineBreaks(message) {
    return message.replace(/(\d+\.\s)/g, "<br><br>$1");
}
