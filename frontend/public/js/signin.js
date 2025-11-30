document.addEventListener("DOMContentLoaded", () => {
    const signinForm = document.getElementById('signinForm');
    const emailInput = document.getElementById('emailInput');
    const passInput = document.getElementById('passInput');
    const email_errorMessage = document.getElementById('email_errorMessage');
    const pass_errorMessage = document.getElementById('pass_errorMessage');

    signinForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passInput.value;

        if (email === "") {
            email_errorMessage.textContent = 'メールアドレスを入力されていません。'
            email_errorMessage.classList.add('is-visible');
        }else {
            email_errorMessage.textContent = "";
            email_errorMessage.classList.remove('is-visible')
        }
        if (password === "") {
            pass_errorMessage.textContent = 'メールアドレスを入力されていません。'
            pass_errorMessage.classList.add('is-visible');
        }else {
            pass_errorMessage.textContent = "";
            pass_errorMessage.classList.remove('is-visible');
        }

        data = {
            email: email,
            password: password
        };
        const response = await fetch("/signin", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await response.json()
        alert(result.message);
        // 成功したらトップページに飛ぶ
        window.location.href = "/";
    })
})