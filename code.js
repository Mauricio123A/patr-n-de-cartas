let button = document.getElementById("button")
let input = document.getElementById("textarea")
let output = document.getElementById("output")
let toggle = document.getElementById("toggle")
let show = true
let button2 = document.getElementById("button2")
let input2 = document.getElementById("textarea2")
let output2 = document.getElementById("output2")

toggle.onclick = function(){
    show = !show
    if (show){
        toggle.innerHTML = "ocultar patrón"
    }else{
        toggle.innerHTML = "mostrar patrón"
    }
}

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

function makeConfigHardWay(max){
    // conseguir posiciones que se repiten
    let repeated = Array(max).fill(0);
    let config = Array.from({ length: max }, (_, i) => i+1)
    let repeatedBool = config.slice()
    
    let repeat = false
    for (let i = 0;  i < config.length;){
        if (repeat){
            repeat = false
            repeated[repeatedBool.indexOf(config[i])] += 1
            config.push(config.splice(i, 1)[0])
        }else{
            repeat = true
            i++
        }
    }
    
    
    
    // conseguir divisiones
    copyRepeated = repeated.slice()
    config = Array.from({ length: max }, (_, i) => i+1)
    let divisions = []
    let last = 0
    let e = 0
    while (repeated.length > 0){
        let thisDivision = []
        for (let i = repeated.filter(x => x === e).length; i > 0; i--){
            thisDivision.push(i+last)
        }
        last = thisDivision[0]
        repeated = repeated.filter(x => x !== e);
        divisions.push(thisDivision)
        e++
        if (repeated.indexOf(e) == -1){
            e++
            if (repeated.indexOf(e) == -1){
                repeated = []
            }
        }
    }
    repeated = copyRepeated.slice()
    for (let i = 0; i < divisions.length; i++){
        divisions[i].reverse()
    }
    
    
    
    // pasar divisiones a las posiciones donde se repiten
    config = [];
    for (let i = 0; i < repeated.length; i++){
        let num = divisions[repeated[i]]
        if (num == undefined){
            num = divisions[repeated[i]-1][0]
            divisions[repeated[i]-1].splice(0,1)
        }else{
            num = num[0]
            divisions[repeated[i]].splice(0,1)
        }
        config.push(num)
    }
    return config
}

function makeConfigEasyWay(max){
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
    let time = Date.now()/1000
    if (Number(number) != NaN & Number(number) > 0){
        number = Number(number)
        let config = makeConfigEasyWay(number)
        if (show){
            output.innerHTML = "(" + config.join(", ") + ")" + "<br> tiempo que tomó: " + (Date.now()/1000-time)
        }else{
            output.innerHTML = "tiempo que tomó: " + (Date.now()/1000-time)
        }
        

        let position = button.getBoundingClientRect().top + window.pageYOffset - window.innerHeight/1.5;
        window.scrollTo({
            top: position
        });
    }else{
        output.textContent = "No has introducido un número válido."
    }
}

button2.onclick = function(){

    let number = input2.value
    let time = Date.now()/1000
    if (Number(number) != NaN & Number(number) > 0){
        number = Number(number)
        let config = makeConfigHardWay(number)
        if (show){
            output2.innerHTML = "(" + config.join(", ") + ")" + "<br> tiempo que tomó: " + (Date.now()/1000-time)
        }else{
            output2.innerHTML = "tiempo que tomó: " + (Date.now()/1000-time)
        }
        

        let position = button2.getBoundingClientRect().top + window.pageYOffset - window.innerHeight/2;
        window.scrollTo({
            top: position
        });
    }else{
        output2.textContent = "No has introducido un número válido."
    }

}
