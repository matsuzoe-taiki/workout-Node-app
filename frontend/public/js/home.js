document.addEventListener("DOMContentLoaded", () => {
    const addWorkout = document.getElementById('addWorkout');
    const nameInput = document.getElementById('nameInput');
    const weightInput = document.getElementById('weightInput');
    const repsInput = document.getElementById('repsInput');
    const setsInput = document.getElementById('setsInput');

    // ワークアウト追加フォームイベントを監視する
    addWorkout.addEventListener('submit', async(e) => {
        e.preventDefault();
        const name = nameInput.value;
        const weight = weightInput.value;
        const reps = repsInput.value;
        const sets = setsInput.value;
        data = {
                name: name,
                weight: weight,
                reps: reps,
                sets: sets
            };
        console.log(data)
        const response = await fetch("/api/add/workouts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
        });
        const result = await response.json();
        alert(`${result.message}`);
    });

    // ワークアウト一覧を表示する
    async function renderWorkouts() {
        try {
            // バックサーバーにアクセス
            const response = await fetch("/api/get/workouts");
            const data = await response.json();
            console.log(data);
        }catch(error){
            console.error("エラー：", error);
        }


    }
    // 初回ロード時に保存済みデータを表示
    renderWorkouts()
});