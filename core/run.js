const API_BASE = config.apikey;
const URI = `${API_BASE}/v1/completions`;

const MAX_TOKENS_LIMIT = 6000;

function formatString(str) {
    str = str.replace(/^\n+|\n+$/g, '');
    return str.replace(/\n\s*\n/g, '\n\n');
}

function calculateTotalTokens() {
    return log.reduce((totalTokens, logEntry) => totalTokens + logEntry.length, 0);
}

function manageMemory() {
    while (calculateTotalTokens() > MAX_TOKENS_LIMIT) {
        const removedEntry = log.shift();
        console.log(`Removed entry due to token limit: ${removedEntry}`);
    }
}

const log = [`${char}:\n${firstmsg}\n`];
async function run(text) {
    const request = {
        prompt: `### Instruction:${inst}\n\n### ${char}'s Information:\n${charinfo}\n\n### Chat start:\n${log.join("")}${user}:\n${text}\n${char}:\n`,
        stop: [`${user}:`, `${char}:`,`###`],
        temperature: 0.9,
        top_p: 0.9,
        max_tokens: 300
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

        let result = (await response.json()).choices[0].text;
        result = formatString(result);
        log.push(`${user}:\n${text}\n${char}:\n${result}\n`);
        manageMemory();
        if (ttsEnabled) {
            speakText(result);
        }
        result = result.replace(/\n/g, '<br>');
        displayMessage(result, "ai-message");
    } catch (error) {
        console.error("Error:", error.message);
    }
}
