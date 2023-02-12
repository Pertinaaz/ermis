const { Configuration, OpenAIApi } = require("openai");
const config = require('./config.js')

const APIkey = config.Client.APIkey
const configuration = new Configuration({
    apiKey: APIkey,
});

const openai = new OpenAIApi(configuration);

async function ask(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.3,
        max_tokens: 1999,
        top_p: 0.1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    const answer = response.data.choices[0].text;
    return answer;

}

module.exports = {
    ask,
};