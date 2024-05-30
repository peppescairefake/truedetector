document.getElementById("startButton").addEventListener("click", function() {
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const result = document.getElementById("result");
    const resultImage = document.getElementById("resultImage");
    const microphoneIcon = document.getElementById("microphoneIcon");

    startButton.style.display = "none";
    stopButton.style.display = "inline-block";
    result.textContent = "Recording...";
    resultImage.style.display = "none";
    microphoneIcon.style.display = "inline-block";

    let isRecording = true;

    const keypressHandler = function(event) {
        if (!isRecording) return;

        if (event.key === 'a' || event.key === 'A') {
            document.getElementById("nextTruth").checked = true;
            document.getElementById("nextLie").checked = false;
        } else if (event.key === 'd' || event.key === 'D') {
            document.getElementById("nextLie").checked = true;
            document.getElementById("nextTruth").checked = false;
        }
    };

    document.addEventListener('keypress', keypressHandler);

    stopButton.addEventListener("click", function() {
        isRecording = false;
        result.textContent = "Processing...";

        setTimeout(() => {
            const correctSound = document.getElementById("correctSound");
            const incorrectSound = document.getElementById("incorrectSound");

            const nextTruth = document.getElementById("nextTruth").checked;
            const nextLie = document.getElementById("nextLie").checked;
            let isTruth;

            if (nextTruth) {
                isTruth = true;
            } else if (nextLie) {
                isTruth = false;
            } else {
                isTruth = Math.random() >= 0.5;
            }

            const truthImages = ["truth1.webp", "truth2.jpg", "truth3.jpg"];
            const lieImages = ["lie1.jpg", "lie2.jpg", "lie3.png"];
            const chosenImage = isTruth ? truthImages[Math.floor(Math.random() * truthImages.length)] : lieImages[Math.floor(Math.random() * lieImages.length)];

            resultImage.src = chosenImage;
            resultImage.style.display = "block";

            const sound = isTruth ? correctSound : incorrectSound;
            sound.play();

            if (isTruth) {
                result.textContent = "Truth!";
            } else {
                result.textContent = "Lie!";
            }

            sound.addEventListener("ended", function() {
                resultImage.style.display = "none";
                microphoneIcon.style.display = "none";
                isRecording = true;
                startButton.style.display = "inline-block";
                stopButton.style.display = "none";
                document.removeEventListener('keypress', keypressHandler);
            }, { once: true });
        }, 2000);
    }, { once: true });
});
