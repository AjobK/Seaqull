let highlightedBlock = document.querySelector(".main__highlighted");
let blockWidth = 4;
let arrayFields = [];
let fillingField = [];
let gridColumn = 1;
let gridRow = 1;
let fadeTimeOut;
let setBiggerBlock = false;

for (var i = 0; i < 150; i++) {
    let randomRGB = {
        red:    Math.random() * 255,
        green:  Math.random() * 255,
        blue:   Math.random() * 255
    };
    
    let newsBlock = document.createElement("article");
    
    console.log("Col: " + gridColumn + " | Row: " + gridRow);
    
    let gridColumnTo = gridColumn+1;
    let gridRowTo = gridRow+1;
    let gridElOptions = [
        ["sm-block-size"],
        ["md-block-size"],
        ["lg-block-size"],
        ["xl-block-size"],
    ];
    let randomGridOption = gridElOptions[Math.floor(Math.random() * (gridElOptions.length-1))];
    
    // if (i === 0) {
    //     newsBlock.classList.add(gridElOptions[3]);
    // } else if (i < 3)  {
    //     newsBlock.classList.add(gridElOptions[0]);
    // } else {
    //     newsBlock.classList.add(randomGridOption);
    // }
    
    newsBlock.classList.add(gridElOptions[0]);
    
    newsBlock.innerHTML = "<p> </p>";
    newsBlock.classList.add("main__highlighted__block");
    newsBlock.style.backgroundColor = ` rgb( ${randomRGB.red},
                                            ${randomRGB.green},
                                            ${randomRGB.blue}
                                        )`;
                                        
    highlightedBlock.appendChild(newsBlock);
}