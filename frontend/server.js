import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

// ホーム画面のAPI
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
})
// ワークアウトの取得
app.get("/api/get/workouts", async (req, res) => {

    const response = await fetch("http://127.0.0.1:5000/api/get/workouts", {
        headers: { "Content-Type": "application/json",
            cookie: req.headers.cookie || "",
        },
    });
    const data = await response.json();
    res.json(data);
})
// ワークアウトのデータベースへの追加
app.post("/api/add/workouts", async (req, res) => {
    const response = await fetch("http://127.0.0.1:5000/api/add/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json",
            cookie: req.headers.cookie || "",
        },
        body: JSON.stringify(req.body),
    });
    const setCookie = response.headers.get("set-cookie");//このconst setCookieとif文はブラウザにsessionの更新が必要であるときに必要であるため、/signinや/signout時に必要であるため、ワークアウトの追加時などには必要ない
    if (setCookie) res.set("set-cookie", setCookie);

    const data = await response.json();
    res.status(response.status).json(data);
})

//ワークアウトの削除API
app.post("/api/delete/workouts", async (req, res) => {
    console.log("ここまではきてるよ")
    const response = await fetch("http://127.0.0.1:5000/api/delete/workouts", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(req.body)
    })
    const data = await response.json();
    res.json(data);
})
//


// サインアップAPI
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});
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


// サインインAPI
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signin.html"));
});
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


// サインアウトAPI
app.get("/signout", async (req, res) => {
    const response = await fetch("http://127.0.0.1:5000/signout", {
        method: "GET",
        headers: {
            cookie: req.headers.cookie || "",
        },
        redirect: "manual"
    });
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) res.set("set-cookie", setCookie);
    res.redirect("/signin")
})



app.listen(3000, () => {
    console.log("Node.js running at http://localhost:3000");
});
