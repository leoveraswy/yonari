
/* ========================================
   YONARI ♡ — INTERACTIONS
======================================== */

// A little surprise for the visitor

const surpriseButton = document.querySelector("#surpriseButton");
const surpriseMessage = document.querySelector("#surpriseMessage");

surpriseButton.addEventListener("click", () => {
    const isHidden = surpriseMessage.hidden;

    surpriseMessage.hidden = !isHidden;

    surpriseButton.textContent = isHidden
        ? "close reminder ♡"
        : "reminder ✨";
});


// Tiny sparkles when clicking the page

/* ========================================
   STEP 4.2 — MAGICAL CLICK BURSTS
======================================== */

document.addEventListener("click", (event) => {
    // Ignore clicks on interface controls and windows
    if (
        event.target.closest(
            "button, a, input, textarea, select, " +
            ".window-titlebar, .desktop-window"
        )
    ) {
        return;
    }

    const symbols = ["✦", "✧", "♡", "⋆", "✿"];

    const colors = [
        "#FFD6E9",
        "#C8E4FF",
        "#E2D5FF",
        "#FFF0B8"
    ];

    // Create seven particles per click
    for (let i = 0; i < 7; i++) {
        const particle = document.createElement("span");

        particle.className = "click-burst-particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = `${event.clientX}px`;
        particle.style.top = `${event.clientY}px`;

        particle.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        // Give each particle a different direction
        const angle = (Math.PI * 2 * i) / 7;
        const distance = 20 + Math.random() * 25;

        particle.style.setProperty(
            "--burst-x",
            `${Math.cos(angle) * distance}px`
        );

        particle.style.setProperty(
            "--burst-y",
            `${Math.sin(angle) * distance}px`
        );

        document.body.appendChild(particle);

        particle.addEventListener("animationend", () => {
            particle.remove();
        });
    }
});

// Log a little greeting in the browser console

console.log("♡ welcome to yonari's little world! ✧");


/* ========================================
   INTERACTIVE DESKTOP WINDOWS
======================================== */

const dockFolders = document.querySelectorAll("[data-open-window]");
const desktopWindows = document.querySelectorAll(".desktop-window");

let highestWindowLayer = 51;

function bringWindowToFront(windowElement) {
    highestWindowLayer += 1;
    windowElement.style.zIndex = highestWindowLayer;
}

dockFolders.forEach((folder) => {
    folder.addEventListener("click", () => {
        const windowId = folder.dataset.openWindow;
        const targetWindow = document.getElementById(windowId);

        if (!targetWindow) return;

        targetWindow.hidden = false;
        bringWindowToFront(targetWindow);
    });
});


/* Close buttons */

desktopWindows.forEach((windowElement) => {
    const closeButton = windowElement.querySelector(".window-close");

    closeButton.addEventListener("click", () => {
        windowElement.hidden = true;
    });

    windowElement.addEventListener("pointerdown", () => {
        bringWindowToFront(windowElement);
    });
});


/* Drag windows by their title bars */

let draggedWindow = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

document.querySelectorAll(".window-titlebar").forEach((titlebar) => {
    titlebar.addEventListener("pointerdown", (event) => {
        if (event.target.closest(".window-close")) return;

        draggedWindow = titlebar.closest(".desktop-window");

        const rect = draggedWindow.getBoundingClientRect();

        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;

        draggedWindow.style.transform = "none";
        draggedWindow.style.left = `${rect.left}px`;
        draggedWindow.style.top = `${rect.top}px`;
        draggedWindow.style.right = "auto";
        draggedWindow.style.bottom = "auto";

        bringWindowToFront(draggedWindow);

        titlebar.setPointerCapture(event.pointerId);
        event.preventDefault();
    });

    titlebar.addEventListener("pointermove", (event) => {
        if (!draggedWindow) return;

        const maxLeft = window.innerWidth - draggedWindow.offsetWidth;
        const maxTop = window.innerHeight - 60;

        const newLeft = Math.max(
            0,
            Math.min(event.clientX - dragOffsetX, maxLeft)
        );

        const newTop = Math.max(
            0,
            Math.min(event.clientY - dragOffsetY, maxTop)
        );

        draggedWindow.style.left = `${newLeft}px`;
        draggedWindow.style.top = `${newTop}px`;
    });

    function stopDragging() {
        draggedWindow = null;
    }

    titlebar.addEventListener("pointerup", stopDragging);
    titlebar.addEventListener("pointercancel", stopDragging);
});

console.log("♡ yonari's little desktop is ready! ✧");

/* ========================================
   SHOW / HIDE DESKTOP DOCK
======================================== */

const desktopDock = document.querySelector(".desktop-dock");
const dockToggle = document.querySelector("#dockToggle");

if (desktopDock && dockToggle) {
    // Hide the dock when the website first opens
    desktopDock.hidden = true;

    function updateDockToggle() {
        const isVisible = !desktopDock.hidden;

        dockToggle.textContent = isVisible
            ? "hide dock ♡"
            : "show dock ♡";

        dockToggle.classList.toggle(
            "dock-visible",
            isVisible
        );

        dockToggle.setAttribute(
            "aria-pressed",
            String(isVisible)
        );
    }

    // Set the initial button appearance
    updateDockToggle();

    dockToggle.addEventListener("click", () => {
        desktopDock.hidden = !desktopDock.hidden;
        updateDockToggle();
    });
}

/* ========================================
   CREATE FLOATING MAGICAL GLITTER
======================================== */

const glitterContainer = document.querySelector(".magic-glitter");

if (
    glitterContainer &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    const glitterSymbols = ["✦", "✧", "⋆", "·"];
    const glitterColors = [
        "#FFD6E9", // pastel pink
        "#C8E4FF", // baby blue
        "#E2D5FF", // lavender
        "#FFF0B8"  // soft yellow
    ];

    for (let i = 0; i < 22; i++) {
        const glitter = document.createElement("span");

        glitter.className = "glitter-particle";
        glitter.textContent =
            glitterSymbols[Math.floor(Math.random() * glitterSymbols.length)];

        glitter.style.left = `${Math.random() * 100}%`;
        glitter.style.top = `${Math.random() * 100}%`;

        glitter.style.setProperty(
            "--glitter-color",
            glitterColors[i % glitterColors.length]
        );

        glitter.style.setProperty(
            "--glitter-size",
            `${8 + Math.random() * 9}px`
        );

        glitter.style.setProperty(
            "--glitter-duration",
            `${5 + Math.random() * 6}s`
        );

        glitter.style.setProperty(
            "--glitter-delay",
            `${-Math.random() * 10}s`
        );

        glitterContainer.appendChild(glitter);
    }
}

console.log("✧ a little extra magic has arrived! ♡");

/* ========================================
   TINY HEART REACTIONS
======================================== */

document.addEventListener("click", (event) => {
    const interactiveElement = event.target.closest(
        "button, .favorite-card"
    );

    if (!interactiveElement) return;

    // Avoid creating hearts for the dock's show/hide toggle
    if (interactiveElement.id === "dockToggle") return;

    const hearts = ["♡", "♥", "୨୧"];
    const heart = document.createElement("span");

    heart.className = "love-reaction";
    heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;

    heart.style.color = [
        "#F2A9CB",
        "#A9CFF5",
        "#C8B6F4"
    ][Math.floor(Math.random() * 3)];

    document.body.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    });
});


/* ========================================
   YONARI MINI-APP FUNCTIONALITY
======================================== */


/* MUSIC PLAYER */

const musicFile = document.querySelector("#musicFile");
const musicAudio = document.querySelector("#musicAudio");

if (musicFile && musicAudio) {
    let currentAudioURL = null;

    musicFile.addEventListener("change", () => {
        const selectedFile = musicFile.files[0];

        if (!selectedFile) return;

        if (currentAudioURL) {
            URL.revokeObjectURL(currentAudioURL);
        }

        currentAudioURL = URL.createObjectURL(selectedFile);
        musicAudio.src = currentAudioURL;
        musicAudio.load();

        musicAudio.play().catch(() => {
            // The user can press Play if playback is blocked.
        });
    });

    window.addEventListener("beforeunload", () => {
        if (currentAudioURL) {
            URL.revokeObjectURL(currentAudioURL);
        }
    });
}


/* TO-DO LIST */

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");

const TASK_STORAGE_KEY = "yonari-mini-app-tasks";

let tasks = [];

try {
    const savedTasks = JSON.parse(
        localStorage.getItem(TASK_STORAGE_KEY) || "[]"
    );

    if (Array.isArray(savedTasks)) {
        tasks = savedTasks.filter((task) =>
            task &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean" &&
            typeof task.id === "string"
        );
    }
} catch {
    tasks = [];
}

function saveTasks() {
    try {
        localStorage.setItem(
            TASK_STORAGE_KEY,
            JSON.stringify(tasks)
        );
    } catch {
        // The list still works during this session if storage is unavailable.
    }
}

function renderTasks() {
    taskList.replaceChildren();

    tasks.forEach((task) => {
        const item = document.createElement("li");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            "aria-label",
            `Mark ${task.text} as complete`
        );

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "task-delete";
        deleteButton.textContent = "×";
        deleteButton.setAttribute(
            "aria-label",
            `Delete task: ${task.text}`
        );

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter((entry) => entry.id !== task.id);
            saveTasks();
            renderTasks();
        });

        item.append(checkbox, text, deleteButton);
        taskList.appendChild(item);
    });

    const completedCount = tasks.filter(
        (task) => task.completed
    ).length;

    taskCount.textContent =
        `${completedCount} of ${tasks.length} tasks completed ♡`;
}

if (taskForm && taskInput && taskList && taskCount) {
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const text = taskInput.value.trim();

        if (!text) return;

        tasks.push({
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            text,
            completed: false
        });

        saveTasks();
        renderTasks();

        taskInput.value = "";
        taskInput.focus();
    });

    renderTasks();
}

console.log("♡ yonari's mini-apps are ready! ✧");
