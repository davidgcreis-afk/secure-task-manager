const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

if (taskInput && addTaskBtn && taskList) {

    async function loadTasks() {
        const saved = localStorage.getItem("tasks");

        if (!saved) {
            tasks = [];
            return;
        }

        try {
            const encrypted = JSON.parse(saved);
            tasks = await decryptData(encrypted);
        } catch (err) {
            alert("Invalid password or corrupted data.");
            sessionStorage.removeItem("authenticated");
            window.location.href = "index.html";
        }
    }


    async function saveTasks() {
        const encrypted = await encryptData(tasks);
        localStorage.setItem("tasks", JSON.stringify(encrypted));
    }


    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.text;
            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener("click", async () => {
        const text = taskInput.value.trim();
        if (!text) return;

        tasks.push({
            id: Date.now(),
            text,
            done: false
        });

        taskInput.value = "";
        await saveTasks();
        renderTasks();
    });


    (async () => {
        await loadTasks();
        renderTasks();
    })();

}


//LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;

    let salt = localStorage.getItem("salt");
    if (!salt) {
        salt = crypto.getRandomValues(new Uint8Array(16));
        localStorage.setItem("salt", JSON.stringify(Array.from(salt)));
    } else {
        salt = new Uint8Array(JSON.parse(salt));
    }

    cryptoKey = await deriveKey(password, salt);

    sessionStorage.setItem("authenticated", "true");
    window.location.href = "dashboard.html";
});


//LOGOUT
document.getElementById("logoutBtn")?.addEventListener("click", () => {
    sessionStorage.removeItem("authenticated");
    window.location.href = "index.html";
});
