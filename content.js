function handleVisibilityChange() {
    let video = document.querySelector('video');
    if (video) {
        if (document.hidden) {
            if (!video.paused) {
                video.pause();
                localStorage.setItem('pausedByExtension', 'true');
            }
        } else {
            if (localStorage.getItem('pausedByExtension') === 'true') {
                video.play();
                localStorage.removeItem('pausedByExtension');
            }
        }
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkVisibility") {
        handleVisibilityChange();
    }
});
