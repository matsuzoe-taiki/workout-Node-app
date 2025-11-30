document.addEventListener("DOMContentLoaded", () => {
    async function renderWorkouts() {
        try {
            // バックサーバーにアクセス
            const response = await fetch("/api/workouts");
            const data = await response.json();
            console.log(data);
        }catch(error){
            console.error("エラー：", error);
        }


    }
    // 初回ロード時に保存済みデータを表示
    renderWorkouts()
});