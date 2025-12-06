
document.addEventListener("DOMContentLoaded", () => {
    const addWorkout = document.getElementById('addWorkout');
    const nameInput = document.getElementById('nameInput');
    const weightInput = document.getElementById('weightInput');
    const repsInput = document.getElementById('repsInput');
    const setsInput = document.getElementById('setsInput');
    const showWorkouts = document.getElementById('showWorkouts');

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
        const response = await fetch("/api/add/workouts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include", //session[user_id]が正しく読める
        body: JSON.stringify(data),
        });
        const result = await response.json();
        alert(`${result.message}`);
    });

    // ワークアウト一覧を表示する
    async function renderWorkouts() {
        try {
            // バックサーバーにアクセス
            const response = await fetch("/api/get/workouts", {
                credentials:"include",
            });
            const data = await response.json();
            console.log(data);
            showWorkouts.innerHTML = "";
            data.forEach(workout => {
                const div = document.createElement("div");
                div.innerHTML = `<h3>${workout.name}</h3>`;
                showWorkouts.appendChild(div);
            });
        }catch(error){
            console.error("エラー：", error);
        }


    }
    // 初回ロード時に保存済みデータを表示
    renderWorkouts()
});