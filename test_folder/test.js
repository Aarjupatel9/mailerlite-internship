const shareButton = document.getElementById("share-button");

shareButton.addEventListener("click", (event) => {
    if ("share" in navigator) {
        navigator
            .share({
                title: "Look at this native web share",
                url:
                    "https://daily-dev-tips.com/posts/using-the-native-web-share-javascript-api/"
            })
            .then(() => {
                console.log("Callback after sharing");
            })
            .catch(console.error);
    } else {
        alert(`Sorry this browser doesn't have native share`)
    }
});