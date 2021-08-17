const initial_price = document.querySelector("#initial_price");
const current_price = document.querySelector("#current_price");
const stock_quantity = document.querySelector("#stock_quantity");

const submit_btn = document.querySelector("#submit_btn");

const output = document.querySelector(".output_msg");
const error = document.querySelector(".error-msg");

const container = document.querySelector(".container");

submit_btn.addEventListener("click", submitHandler);

function submitHandler(){
    
    if(isValidInput()){
        calculateProfitLoss();
    }
}

function isValidInput(){
    
    if(initial_price.value === "" || current_price.value === "" || stock_quantity.value === ""){
        setError("Please enter all the values");
    }
    else if(Number(initial_price.value) <= 0 || Number(current_price.value) <= 0 || Number(stock_quantity.value) <=0 ){
        console.log("invalid")
        setError("Please enter valid values. Values should be greater than zero");
    }
    else{
        console.log("valid")
        return true;
    }
}

function setError(errorText){
    error.style.display = "initial";
    error.innerText = errorText;
}

function resetError(){
    error.innerText = "";
}

function calculateProfitLoss(){

    let init_price = Number(initial_price.value);
    let curr_price = Number(current_price.value);
    let quantity = Number(stock_quantity.value);

    if(init_price > curr_price){
        
        let loss = ((init_price - curr_price) * quantity).toFixed(2);
        let loss_per = ((loss / (init_price*quantity)) * 100).toFixed(2);
        setOutput("Loss", loss, loss_per);
    }
    else if(init_price < curr_price){
        
        let profit = ((curr_price - init_price) * quantity).toFixed(2);
        let profit_per = ((profit / (init_price*quantity)) * 100).toFixed(2);
        setOutput("Profit", profit, profit_per);
    }
    else{
        setOutput("Neutral");
    }

}

function setOutput(status, amount, percentage){

    switch (status) {
        case "Profit":
            output.innerHTML = `<div><img src='./assets/profit.svg'></div><div style="margin:auto; font-size:1.2rem">The profit is ${amount} and the profit percentage is ${percentage} %</div>`
            if(percentage >= 50){
                container.style.background="#32Cd32";
            }
            break;

        case "Loss":
            output.innerHTML = `<div><img src='./assets/loss.svg'></div><div style="margin:auto; font-size:1.2rem">The loss is ${amount} and the loss percentage is ${percentage} %</div>`
            if(percentage >= 50){
                container.style.background="#EF4444";
            }
            break;
    
        case "Neutral":
            container.style.background="#FBBF24";
            output.innerHTML = `<div><img src='./assets/neutral.svg'></div><div style="margin:auto; font-size:1.4rem">You earned No profit No loss</div>`
            break;
    
        default:
            break;
    }

    document.querySelector(".footer").scrollIntoView();
}

function resetOutput(){
    container.style.background = "white";
    output.innerText="";
}

initial_price.addEventListener("click", function(){
    resetError();
    resetOutput();
})

stock_quantity.addEventListener("click", function(){
    resetError();
    resetOutput();
});

current_price.addEventListener("click", function(){
    resetError();
    resetOutput();
});