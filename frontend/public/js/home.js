document.addEventListener("DOMContentLoaded", () => {
    const addWorkout = document.getElementById('addWorkout');
    const nameInput = document.getElementById('nameInput');
    const weightInput = document.getElementById('weightInput');
    const repsInput = document.getElementById('repsInput');

    // ワークアウト追加フォームイベントを監視する
    addWorkout.addEventListener('click', async(e) => {
        e.preventDefault();
        const name = nameInput.value;
        const weight = weightInput.value;
        const reps = repsInput.value;

        if (name === "") {
            alert("種目名を入力してください");
        }else {
            data = {
                name: name,
                weight: weight,
                reps: reps
            };
            const response = await fetch("/api/add/workout", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
            });
            const result = await response.json();
            alert("追加が完了しました!");
        }
    });

    // ワークアウト一覧を表示する
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