let button = document.getElementById("button")
let input = document.getElementById("textarea")
let output = document.getElementById("output")

function showConfig(config){
    let showed = 0
    let toshow = config.length
    let show = true
    while (showed < toshow) {
        if (show){
            show = false
            console.log(config[0])
            config.splice(0, 1)
            showed++
        }else{
            show = true
            config.push(config.splice(0, 1)[0])
        }
    }
}

function outputConfig(config){
    let showed = 0
    let toshow = config.length
    let show = true
    let output = []
    while (showed < toshow) {
        if (show){
            show = false
            output.push(config[0])
            config.splice(0, 1)
            showed++
        }else{
            show = true
            config.push(config.splice(0, 1)[0])
        }
    }
    return output
}

function makeConfig(max){
    let config = []
    let i = 0
    while (i < max){
        i++
        config.push(i)
    }
    let lastConfig = config.slice()
    let output = outputConfig(config)
    config = lastConfig.slice()
    for (let e = 0; e < output.length; e++){
        config.splice(lastConfig.indexOf(output[e]), 1, e+1)
    }
    return config
}

button.onclick = function(){
    let number = input.value
    console.log(Number(number))
    if (Number(number) != NaN & Number(number) > 0){
        number = Number(number)
        let config = makeConfig(number)
        console.log(config.join(","))
        output.textContent = "(" + config.join(", ") + ")"
    }else{
        output.textContent = "No has introducido un número válido."
    }
}