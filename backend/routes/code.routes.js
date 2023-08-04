const { Router } = require("express");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const codeRouter = Router();
require('dotenv').config();

codeRouter.post('/convert', async (req, res) => {
    try {
        let {code, lang} = req.body;
        let response = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: "POST",
            headers:{
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content:`convert this piece of code: ${code} into the code of this ${lang} and only give me the code`}],
                max_tokens: 1000
            })
        });
        response = await response.json();
        const data = response.choices[0].message.content;
        res.status(200).send({code: data});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: error.message});
    }
})

codeRouter.post('/debug', async(req, res)=>{
    try {
        let {code} = req.body;
        let response = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: "POST",
            headers:{
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content:`debug this piece of code: ${code} and give me the debugged code and the problem with the code`}],
                max_tokens: 1000
            })
        });
        response = await response.json();
        const data = response.choices[0].message.content;
        res.status(200).send({code: data});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: error.message});
    }
})

codeRouter.post('/quality-checker', async(req, res)=>{
    try {
        let {code} = req.body;
        let response = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: "POST",
            headers:{
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content:`check the quality of this piece of code: ${code} and generate a short report based on that`}],
                max_tokens: 1000
            })
        });
        response = await response.json();
        const data = response.choices[0].message.content;
        res.status(200).send({report: data});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: error.message});
    }

})

module.exports = {
    codeRouter
}