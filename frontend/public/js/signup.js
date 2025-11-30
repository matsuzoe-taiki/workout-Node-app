document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passInput = document.getElementById('passInput');
    const name_errorMessage = document.getElementById('name_errorMessage');
    const email_errorMessage = document.getElementById('email_errorMessage');
    const pass_errorMessage = document.getElementById('pass_errorMessage');

    signupForm.addEventListener("submit", async (e) => {
        // ページの再読み込みを防ぐ
        e.preventDefault();
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passInput.value;
        
        // バリデーション処理（名前）
        if (name === "") {
            name_errorMessage.textContent = '※ユーザーネームが入力されていません。';
            name_errorMessage.classList.add('is-visible');
        }else {
            name_errorMessage.textContent = "";
            name_errorMessage.classList.remove('is-visible')
        }
        if (email === "") {
            email_errorMessage.textContent = '※メールアドレスが入力されていません。';
            email_errorMessage.classList.add('is-visible');
        }else {
            email_errorMessage.textContent = "";
            email_errorMessage.classList.remove('is-visible')
        }
        if (password === "") {
            pass_errorMessage.textContent = '※パスワードが入力されていません。';
            pass_errorMessage.classList.add('is-visible');
        }else {
            pass_errorMessage.textContent = "";
            pass_errorMessage.classList.remove('is-visible')
        }

        const data = {
            name: name,
            email: email,
            password: password
        };
        // サーバーにフォームの内容を送信
        const resp = await fetch("/signup", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        });
        // awaitを書かなければresultを定義する前にalartが走ってしまう
        const result = await resp.json()
        alert(result.message);
        window.location.href = "/signin"; //ログインページに飛ぶ
    });
});