TIME = 90000;
PAUSE = false;
RATE = 1;
SELECTC = "lightblue";
CARDID = 0;
if(randomInt(1,2) == 1){
    TEAM = "MAD";
    MAD.style.backgroundColor = SELECTC;
    GLAD.style.backgroundColor = "white";
}
else{
    TEAM = "GLAD";
    MAD.style.backgroundColor = "white";
    GLAD.style.backgroundColor = SELECTC;
}
console.log(TEAM);
DISCARD = [];
SELECT = null;
POINTSM = [];
POINTSG = [];

start.addEventListener("click", function(){
    if(PAUSE){
        start.style.backgroundColor = "yellow";
        start.innerHTML = "pause";
        start.style.color = "black";
        PAUSE = false;
    }
    else{
        startToStart();
        PAUSE = true;
    }
    timer();
    if(TIME != 90000){
        find();
    }
    
});

skip.addEventListener("click", function(){
    if(TIME != 90000){
        find();

        if(TEAM == "MAD"){
            place(Mred, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
        }
        else{
            place(Gred, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
        }    
    }
    count();
});

reset.addEventListener("click", function(){
    if(PAUSE){
        TIME = 90000;
        time.innerHTML = String(TIME).substr(0, 2);
    }
});

function timer(){
    if(!PAUSE){
        time.innerHTML = String(TIME).substr(0, 2);
        setTimeout(update, (RATE * 1000));
        if(TIME == 0){
            switchTeam();
            TIME = 90000;
            PAUSE = true;
            time.innerHTML = String(TIME).substr(0, 2);
        }
        else{
            TIME -= 1000;
        }

    }
}

Next.addEventListener("click", function(){
    switchTeam();
    TIME = 90000;
    time.innerHTML = String(TIME).substr(0, 2);
    PAUSE = true;
    startToStart();

});

function getCard(){
    one.innerHTML = GAMEDATA[SELECT][1];
    three.innerHTML = GAMEDATA[SELECT][3];
    DISCARD.push(SELECT);
}

function find(){
    SELECT = randomInt(1,GAMEDATA.length);
    if(DISCARD.length == 0){
        getCard(SELECT);
    }
    else{
        if(DISCARD.includes(SELECT) == false){
            getCard();
        }
    }
}

gotOne.addEventListener("click", function(){
    if(isIn == false){
        getCard();
    }
    if(TEAM == "MAD"){
        if(isIn(GAMEDATA[SELECT][1], POINTSM) == false){
            POINTSM.push(GAMEDATA[SELECT][0], GAMEDATA[SELECT][1]);
            place(Myellow, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
        }
    }
    else
    {
        if(isIn(GAMEDATA[SELECT][3], POINTSM) == false){
            POINTSM.push(GAMEDATA[SELECT][0], GAMEDATA[SELECT][1]);
            place(Gyellow, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
        }
    }
    find();
    count();
});

gotThree.addEventListener("click", function(){
    if(isIn == false){
        getCard();
    }
    if(TEAM == "MAD"){
        if(isIn(GAMEDATA[SELECT][1], POINTSM) == false){
            POINTSM.push(GAMEDATA[SELECT][2], GAMEDATA[SELECT][3]);
            place(Mgreen, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
        }
    }
    else
    {
        if(isIn(GAMEDATA[SELECT][3], POINTSM) == false){
            POINTSM.push(GAMEDATA[SELECT][2], GAMEDATA[SELECT][3]);
            place(Ggreen, GAMEDATA[SELECT][1], GAMEDATA[SELECT][3]);
        }
    }
    find();
    count();
});

function place(whereTo, topC, bottomC){
    if(typeof whereTo === 'string') whereTo = document.getElementById(whereTo);
    CARDID ++
    fig = document.createElement('figure');
        fig.id = CARDID;
        fig.classList.add("points");
        div = document.createElement('div');
            div.setAttribute('data-style', 'content');
            p = document.createElement('p');
                p.textContent = topC;
            div.appendChild(p);
            p = document.createElement('p');
                p.textContent = bottomC;
            div.appendChild(p);
        fig.appendChild(div);
        div = document.createElement('div');
            div.setAttribute('data-style', 'contentb');
            but = document.createElement('button');
                but.textContent = '△';
                but.setAttribute("onclick", "upF('" + CARDID + "', '" + whereTo.id + "', '" + escapeQuotes(topC) + "', '" + escapeQuotes(bottomC) + "')");
            div.appendChild(but);
            but = document.createElement('button');
                but.textContent = '▽';
                but.setAttribute("onclick", "downF('" + CARDID + "', '" + whereTo.id + "', '" + escapeQuotes(topC) + "', '" + escapeQuotes(bottomC) + "')");
            div.appendChild(but);
            but = document.createElement('button');
                but.textContent = 'x';
                but.setAttribute("onclick", "remove(" + CARDID + ")");
        div.appendChild(but);
        fig.appendChild(div);
    fig.style.backgroundColor = "grey";
    // console.log(whereTo);
    // console.log(typeof whereTo);
    whereTo.appendChild(fig);
}

function escapeQuotes(str) {
    return String(str).replace(/'/g, "\\'");
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function update(){
    timer();
}

function upF(oldid, whereIs, topC, bottomC) {
    if(whereIs.includes('red')){
        whereTo = "green"
    }
    if(whereIs.includes('yellow')){
        whereTo = "red"
    }
    if(whereIs.includes('green')){
        whereTo = "yellow"
    }
    place(whereIs[0] + whereTo, topC, bottomC);
    remove(oldid);
}

function downF(oldid, whereIs, topC, bottomC) {
    if(whereIs.includes('red')){
        whereTo = "yellow"
    }
    if(whereIs.includes('yellow')){
        whereTo = "green"
    }
    if(whereIs.includes('green')){
        whereTo = "red"
    }
    place(whereIs[0] + whereTo, topC, bottomC);
    remove(oldid);
}

function remove(oldid){
    elementToRemove = document.getElementById(oldid);
    if (elementToRemove) {
    elementToRemove.remove();
    }
    count();
}

function isIn(item, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].includes(item) || item.includes(list[i])) {
            return true;
        }
    }
    return false;
}

function switchTeam(){
    if(TEAM == "MAD"){
        TEAM = "GLAD";
        MAD.style.backgroundColor = "white";
        GLAD.style.backgroundColor = SELECTC;
    }
    else{
        TEAM = "MAD";
        GLAD.style.backgroundColor = "white";
        MAD.style.backgroundColor = SELECTC;
    }
    console.log(TEAM);
}

function count(){
    MRcount = Mred.childElementCount;
    MYcount = Myellow.childElementCount;
    MGcount = Mgreen.childElementCount;
    Mcount = (-1 * (MRcount - 1)) + (MYcount - 1) + (3 * (MGcount - 1));
    MADc.innerHTML = (Mcount + " team MAD");
    console.log("mad: " + Mcount);
    GRcount = Gred.childElementCount;
    GYcount = Gyellow.childElementCount;
    GGcount = Ggreen.childElementCount;
    Gcount = (-1 * (GRcount - 1)) + (GYcount - 1) + (3 * (GGcount - 1));
    GLADc.innerHTML = ("team GLAD " + Gcount);
    console.log("GLAD: " + Gcount); 
}

function startToStart(){
    start.style.backgroundColor = "lime";
    start.innerHTML = "start";
    start.style.color = "white";
}