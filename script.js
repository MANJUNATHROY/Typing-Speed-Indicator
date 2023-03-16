const typetext = document.querySelector(".typetext p")
const inputfield = document.querySelector(".wrapper .inputfield")
let mistake = document.querySelector(".mistake span b");
let timetag = document.querySelector(".time span b")
let wpmtag = document.querySelector(".wpm span b");
let cpm = document.querySelector(".cpm span b");
let btn=document.querySelector(".content button");



let charindex = 0;
let mistakes = 0;
let timer;
maxtime = 60;
timeleft = maxtime;
let istyping = 0;


function randomparagraph() {
    let rand = Math.floor(Math.random() * paragraphs.length)
    typetext.innerHTML=""
    paragraphs[rand].split("").forEach(span => {
        let spantag = `<span>${span}</span>`;
        typetext.innerHTML += spantag;
    })
    typetext.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown", () => inputfield.focus())
    typetext.addEventListener("click", () => inputfield.focus())
}

randomparagraph()

function inittype() {
    const characters = typetext.querySelectorAll("span");
    console.log(characters[charindex])
    let typechar = inputfield.value.split("")[charindex];
    if (charindex < characters.length - 1 && timeleft > 0) {
        if (!istyping) {
            timer = setInterval(inittimer, 1000)
            istyping = true;
        }
        if (typechar == null) {
            charindex--;
            if (characters[charindex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charindex].classList.remove("correct", "incorrect");
        } else {
            if (characters[charindex].innerText === typechar) {
                characters[charindex].classList.add("correct")
            } else {
                mistakes++;
                characters[charindex].classList.add("incorrect")

            }
            charindex++;

        }

        characters.forEach(span => span.classList.remove("active"))
        characters[charindex].classList.add("active")

        let wpm = Math.round((((charindex - mistakes) / 5) / (maxtime - timeleft)) * 60)
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
        mistake.innerText = mistakes;
        wpmtag.innerText = wpm;
        cpm.innerText = charindex - mistakes;
    }else{
        inputfield.value=""
        clearInterval(timer)
    }

}

function inittimer() {
    if (timeleft > 0) {
        timeleft--;
        timetag.innerText = timeleft;
    } else {
        clearInterval(timer)
    }
}
inputfield.addEventListener("input", inittype)

btn.addEventListener("click",resetall);

function resetall(){
    randomparagraph();
    inputfield.value=""
    clearInterval(timer)
    charindex=0;
    istyping=0;
    timeleft=maxtime;
    timetag.innerText=timeleft;
    mistakes=0;
    mistake.innerText=mistakes;
    wpmtag.innerText=0;
    cpm.innerText=0;
    
}