
document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById('nameInput');
    const weightInput = document.getElementById('weightInput');
    const repsInput = document.getElementById('repsInput');
    const setsInput = document.getElementById('setsInput');
    const showWorkouts = document.getElementById('showWorkouts');
    const addForm = document.getElementById('addForm');
    const cardDialog = document.getElementById('cardDialog');
    const updateBtn = document.getElementById('updateBtn');
    const deleteBtn = document.getElementById('deleteBtn');

    let selectedID = null;


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
                console.log(div.dataset.id);            
                div.classList.add("workout-card");//カードクラスを追加
                div.innerHTML = `<div>${workout.name}</div><div>${workout.weight}kg</div><div>${workout.reps}回</div><div>${workout.sets}セット</div>`;

                div.addEventListener("click", () => {
                    selectedID = workout.id
                    cardDialog.showModal();
                });
                showWorkouts.appendChild(div);
            });
        }catch(error){
            console.error("エラー：", error);
        }
    }  
    // 初回ロード時に保存済みデータを表示
    renderWorkouts();

    //編集するボタンを押した時の処理
    updateBtn.addEventListener("click", () => {
        
    })
    //削除ボタンを押した時の処理
    deleteBtn.addEventListener("click", async () => {
        console.log("削除ボタンが押されました")
        data = {
            id: selectedID
        }
        const response = await fetch("/api/delete/workouts", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
        window.location.reload();
    })
});