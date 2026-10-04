// =========================
// LITTLE INTERNET EFFECTS
// =========================

// Make the floating stickers react slightly to the mouse.

const stickers = document.querySelectorAll(".sticker");

document.addEventListener("mousemove", (event) => {

    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    stickers.forEach((sticker, index) => {

        const movement = (index + 1) * 7;

        sticker.style.marginLeft = `${x * movement}px`;
        sticker.style.marginTop = `${y * movement}px`;

    });

});


// =========================
// DAILY CLICK
// =========================

const dailyClick = document.querySelector(".header-buttons button");

dailyClick.addEventListener("click", () => {

    const messages = [
        "you found the button.",
        "why did you click that",
        "daily click achieved",
        "congratulations i guess",
        "★ CLICK REGISTERED ★",
        "there was absolutely no reason to do that"
    ];

    const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

    alert(randomMessage);

});


// =========================
// CHARACTER ARCHIVE
// =========================

const characterDialog = document.querySelector("#character-dialog");
const characterCards = document.querySelectorAll(".character-card");
const characterDialogImage = characterDialog.querySelector("img");
const characterDialogTitle = characterDialog.querySelector("h2");
const characterDialogDescription = characterDialog.querySelector("p");

window.openCharacter = (index) => {
    const characterCard = characterCards[index];

    if (!characterCard) {
        return;
    }

    const image = characterCard.querySelector(".character-image img");

    characterDialogImage.src = image.getAttribute("src");
    characterDialogImage.alt = image.alt;
    characterDialogTitle.textContent = characterCard.querySelector("h3").textContent.trim();
    characterDialogDescription.textContent = characterCard.querySelector(".character-info p").textContent.trim();
    characterDialog.showModal();
};

characterDialog.querySelector(".character-dialog-close").addEventListener("click", () => {
    characterDialog.close();
});

characterDialog.addEventListener("click", (event) => {
    if (event.target === characterDialog) {
        characterDialog.close();
    }
});


// =========================
// MUSIC PLAYER
// =========================

const audioPlayer = document.querySelector("#audioPlayer");
const vinyl = document.querySelector("#vinyl");
const nowPlaying = document.querySelector("#now-playing");
const songButtons = document.querySelectorAll(".music .song[data-audio]");
let activeSongButton = null;

function playSong(file, title, button) {
    audioPlayer.src = file;
    audioPlayer.dataset.trackTitle = title;
    nowPlaying.textContent = `NOW PLAYING: ${title}`;
    activeSongButton = button;

    songButtons.forEach((songButton) => {
        const isActive = songButton === button;

        songButton.classList.toggle("is-playing", isActive);
        songButton.querySelector("small").textContent = isActive ? "Ⅱ" : "▶";
    });

    audioPlayer.play().catch(() => {
        vinyl.classList.remove("playing");
        nowPlaying.textContent = `UNABLE TO PLAY: ${title}`;
    });
}

songButtons.forEach((button) => {
    button.addEventListener("click", () => {
        playSong(button.dataset.audio, button.dataset.title, button);
    });
});

audioPlayer.addEventListener("pause", () => {
    vinyl.classList.remove("playing");

    if (activeSongButton) {
        activeSongButton.querySelector("small").textContent = "▶";
    }
});

audioPlayer.addEventListener("playing", () => {
    vinyl.classList.add("playing");
});

audioPlayer.addEventListener("play", () => {
    if (activeSongButton) {
        activeSongButton.querySelector("small").textContent = "Ⅱ";
    }
});

audioPlayer.addEventListener("ended", () => {
    vinyl.classList.remove("playing");

    if (activeSongButton) {
        activeSongButton.querySelector("small").textContent = "▶";
    }
});

audioPlayer.addEventListener("error", () => {
    vinyl.classList.remove("playing");

    const title = audioPlayer.dataset.trackTitle;

    if (title) {
        nowPlaying.textContent = `UNABLE TO LOAD: ${title}`;
    }
});