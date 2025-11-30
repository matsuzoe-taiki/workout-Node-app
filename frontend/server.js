import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 動作確認
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"))
});

app.use(express.static(path.join(__dirname, "public")));


app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signin.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"));
});

app.get("/exercise/detail", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "detail.html"));
});


app.get("/signout", (req, res) => {

})

// Flaskに新規登録の情報を送る
app.post("/signup", async (req, res) => {
    const resp = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
    });  //これでブラウザから受け取ったreq.bodyをFlaskにそのまま転送
    const data = await resp.json();
    res.status(resp.status).json(data);
})

// Flaskにログインフォームの情報を送る
app.post("/signin", async (req, res) => {
    const resp = await fetch("http://127.0.0.1:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
    });  //これでブラウザから受け取ったreq.bodyをFlaskにそのまま転送

    // Flaskが返したCookieをブラウザに流す
    const setCookie = resp.headers.get("set-cookie");
    if (setCookie) res.set("set-cookie", setCookie);

    const data = await resp.json();
    res.status(resp.status).json(data);
})





app.listen(3000, () => {
    console.log("Node.js running at http://localhost:3000");
});
