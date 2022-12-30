let mode = true


document.getElementById("btn").addEventListener("click", () =>{
    let copyText = document.getElementById("input");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    alert("Copied");
});


document.getElementById("dark").addEventListener("click", () =>{
    mode = !mode

    if(mode === false){
        document.getElementById("dark").src = "./light.png"
        document.querySelector(".dark").textContent = "Light mode"
        document.getElementById("logo-text").style.color = "rgb(230, 230, 230)";
        document.body.style.background = "#252525";
        document.body.style.color = "rgb(230, 230, 230)"
    }else{
        document.getElementById("dark").src = "./darkLogo.png"
        document.querySelector(".dark").textContent = "Dark mode"
        document.getElementById("logo-text").style.color = "grey";
        document.body.style.background = "rgb(249, 253, 255)";
        document.body.style.color = "#252525"
    }

})

let Data;
let dataPosition = 0

fetch("./data.json")
.then(res => res.json()) 
.then(data => {
     Data = data.addresses.map(data => {
        const{from, to, amountIn} = data
        return(`<tr class="fade">
        <td class="from">${from}</td>
        <td class="from">${to}</td>
        <td class='tf'>transfer</td>
        <td>${amountIn}</td>
      </tr>`)
    })    
    
    let call = 0
    const length = Data.length

    function hideAllSlides() {
        if(call === length - 1){
            call = 0
        }else{
            call += 1
        }
        const element = `<table class="table">
        <tr>
        <th>from</th>
        <th>to</th>
        <th>method</th>
        <th>value</th>
        </tr>
        ${Data[call - 1 === length - 1 || call - 1 < 0 ? 1 : call - 1]}
        ${Data[call - 2 === length - 1 || call - 2 < 0 ? 2 : call - 2]}
        ${Data[call - 3 === length - 1 || call - 3 < 0 ? 3 : call - 3]} 
        ${Data[call + 3 === length - 1 || call + 3 < 0 ? 3 : call + 3]}
        ${Data[call + 2 === length - 1 || call + 2 < 0 ? 2 : call + 2]}
        ${Data[call + 1 === length - 1 || call + 1 < 0 ? 1 : call + 1]}
        ${Data[call]}}
    </table>`
    document.getElementById("transaction").innerHTML = element
    }
    setInterval(() =>{
        hideAllSlides()
    }, 9000)
   
})





