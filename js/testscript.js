let highlightedBlock = document.querySelector(".main__highlighted");
let blockWidth = 4;
let arrayFields = [];
let fillingField = [];
let coords = {
    x: 0,
    y: 0
};

for (var i = 0; i < 100; i++) {
    let newsBlock = document.createElement("article");
    if (i % blockWidth === 0 && i) {
        arrayFields.push(fillingField);
        fillingField = [i];
    } else {
        fillingField.push(i)
    }
    
    newsBlock.innerHTML = "<p>" + (i+1) + "</p>";
    newsBlock.classList.add("main__highlighted__block");
    let randomImg = "https://picsum.photos/500/500/?image=" + (Math.ceil(Math.random() * 30));
    newsBlock.style.backgroundImage = "url('" + randomImg + "')";
    highlightedBlock.appendChild(newsBlock);
}

console.log(arrayFields);