const wrapper = document.querySelector(".wrapper");
const carosul = document.querySelector(".carosul");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carosul.querySelector(".card").offsetWidth;
const carosulChildrens = [...carosul.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carosul.offsetWidth / firstCardWidth);

carosulChildrens.slice(-cardPerView).reverse().forEach(card => {
    carosul.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carosulChildrens.slice(0, cardPerView).forEach(card => {
    carosul.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carosul.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carosul.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carosul.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; //if isDragging is false return from here
     carosul.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carosul.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carosul.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const isFiniteScroll = () => {
    if(carosul.scrollLeft === 0) {
        carosul.classList.add("no-transition");
       carosul.scrollLeft = carosul.scrollWidth - ( 2 * carosul.offsetWidth); 
       carosul.classList.remove("no-transtion");

    } else if (Math.ceil(carosul.scrollLeft) === carosul.scrollWidth - carosul.offsetWidth) {
        carosul.classList.add("no-transtion");
        carosul.scrollLeft = carosul.offsetWidth;
        carosul.classList.remove("no-transtion");
    }
    clearTimeout(timeoutId);
    if(wrapper.matches(":hover")) autoPlay();

}

carosul.addEventListener("mousedown", dragStart);
carosul.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carosul.addEventListener("scroll", isFiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout (timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
