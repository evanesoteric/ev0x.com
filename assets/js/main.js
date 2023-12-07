// Headroom
(function() {
    new Headroom(document.querySelector("#header"), {
        tolerance: 10,
        offset : 205,
        classes: {
            initial: "slide",
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned"
        }
    }).init();
}());


// Scroll To Top
var scrollToTop = document.getElementById("scrollToTop");
window.addEventListener("scroll", function() {
    if (window.scrollY < 300) {
        scrollToTop.classList.add("hide-from-print");
    }
    else {
        scrollToTop.classList.remove("hide-from-print");
        scrollToTop.classList.add("uk-animation-slide-right");
    }
});


// x
