function main() {

    let currentIndex = 0;
    let place = [
        {
            top: "133px",
            left: "165px"
        },
        {
            top: "153px",
            left: "165px"
        },
        {
            top: "175px",
            left: "165px"
        }
    ];
    let highlight_place = [
        {
            top: "5px",
            width: "120px",
        },
        {
            top: "28px",
            width: "155px",
        },
        {
            top: "48px",
            width: "65px",
        },
    ];

    let hand = document.querySelector(".pointer-hand");
    let highlight = document.querySelector(".highlight");
    let shimerList = document.querySelectorAll(".shimmer-ready");

    // Prepare shimmer
    for (let shim of shimerList) {
        let text = shim.innerHTML;
        shim.innerHTML = "";
        let textList = text.split("");
        let newText = [];
        for (let c of textList) {
            let el = document.createElement("span");
            el.innerHTML = c;
            shim.appendChild(el);
        }
    }

    let resetShimmer = (elm) => {
        let newElem = [];
        let spans = elm.querySelectorAll("span");
        for (let span of spans) {
            let e = document.createElement("span");
            e.innerHTML = span.innerHTML;
            newElem.push(e);
        }
        elm.innerHTML = "";
        for (let n of newElem) {
            elm.appendChild(n);
        }
        return elm;
    };

    let adjust = () => {
        // Move hand
        hand.style.top = place[currentIndex].top;

        // Move highlight
        highlight.style.top = highlight_place[currentIndex].top;
        highlight.style.width = highlight_place[currentIndex].width;

        // Activate shimmer
        shimerList[currentIndex] = resetShimmer(shimerList[currentIndex]);
        let target = shimerList[currentIndex];
        let targetList = target.querySelectorAll("span");
        let targetLength = targetList.length;
        let timeSpace = 50;

        let createTimeout = index => {
            setTimeout(() => {
                targetList[index].className = "shimmer";
                if (index + 1 < targetLength) {
                    createTimeout(index + 1);
                }
            }, (index == 0)? 0 : timeSpace);
        };
        createTimeout(0);

    };

    window.addEventListener("keyup", e => {
        if (e.key == "ArrowUp") {
            currentIndex = (currentIndex - 1) % 3;
            if (currentIndex < 0) currentIndex += 3;
        } else if (e.key == "ArrowDown") {
            currentIndex = (currentIndex + 1) % 3;
        }
        adjust();
    });
    adjust();
}
window.onload = main;
