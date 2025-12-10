
document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById('nameInput');
    const weightInput = document.getElementById('weightInput');
    const repsInput = document.getElementById('repsInput');
    const setsInput = document.getElementById('setsInput');
    const showWorkouts = document.getElementById('showWorkouts');
    const addForm = document.getElementById('addForm');

    // ワークアウト追加フォームイベントを監視する
    addForm.addEventListener('submit', async(e) => {
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
        window.location.reload();
    });

    // ワークアウト一覧を表示する
    async function renderWorkouts() {
        try {
            // バックサーバーにアクセス
            const response = await fetch("/api/get/workouts", {
                credentials:"include",
            });
            const data = await response.json();
            showWorkouts.innerHTML = "";
            data.forEach(workout => {
                const div = document.createElement("div");
                div.classList.add("workout-card");//カードクラスを追加
                div.innerHTML = `<div>${workout.name}</div><div>${workout.weight}kg</div><div>${workout.reps}回</div><div>${workout.sets}セット</div>`;
                showWorkouts.appendChild(div);
            });
        }catch(error){
            console.error("エラー：", error);
        }finally{
            // const workoutCards = document.querySelectorAll('.workout-card');
            // console.log(workoutCards);
            // workoutCards.forEach(card => {
            //     console.log(card)
            //     card.addEventListener("pointerdown", (e) => {
            //         card.style.background = "red";
            //     });
            // })
            const cardDialog = document.getElementById('cardDialog');
            document.querySelectorAll('.workout-card').forEach(card => {
                console.log("成功")
                card.addEventListener("click", () => {
                    cardDialog.showModal();
                });
            });

        }
    }
    // 初回ロード時に保存済みデータを表示
    renderWorkouts();
});