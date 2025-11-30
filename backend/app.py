from flask import Flask, request, jsonify, session, url_for, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import pymysql
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

# 認証チェック（ログインしてる人のみ通す仕組み）
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):#「*argsと**kwargs」があることで元の関数にも引数を安全に渡してくれる。
        #「*args」は位置引数（idなど）、**kwargsはキーワード引数(name="john"など)を受け取れる入れ物
        # セッションにユーザーIDがなかったら未ログイン扱い
        if "user_id" not in session:
            return jsonify({"error": "ログインを行なってください"}), 401
        
        return f(*args, **kwargs)
    return decorated_function

#データベースに接続
def getConnection():
    return pymysql.connect(
        host="localhost",
        port=8889,
        db="workout_Node_db",
        user="root",
        password="root",
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True,
        init_command='SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED'
    )

@app.post("/signup")
def signup():
    data = request.get_json()
    name = data["name"]
    email = data["email"]
    password = generate_password_hash(data["password"])
    db = getConnection()
    cursor = db.cursor()
    try:
        sql = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
        cursor.execute(sql, (name, email, password))
        db.commit()
    finally:
        cursor.close()
        db.close()
    return jsonify({"message": "新規登録が完了しました"}), 201

@app.post("/signin")
def signin():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    db = getConnection()
    cursor = db.cursor()
    try:
        sql = "SELECT * FROM users WHERE email = %s"
        cursor.execute(sql, (email,))
        item = cursor.fetchone()
    finally:
        cursor.close()
        db.close()
    
    # もしもusersテーブルに取得したuser_emailが存在し、
    # さらにcheck_password_hashで取得したusersテーブルの
    # passwordと入力されたpasswordを照合する。
    if email and check_password_hash(item["password"], password):
        session["user_id"] = item["id"] #セッションに保存
        session["user_name"] = item["name"]
        session["user_email"] = item["email"]
        session["first_login"] = True
        return jsonify({"message": "ログイン成功"}), 200
    else:
        return "ログイン失敗"

@app.get("/signout")
def signout():
    session.clear()
    return redirect(url_for("signin"))

if __name__ == "__main__":
    app.run(port=5000, debug=True)