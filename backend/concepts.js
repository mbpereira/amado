const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Rejeitando depois de " + time + " segundos")
        }, time * 100)
    })

}

const awaitForSleep = () => {
    return sleep(5)
        .then(res => Promise.resolve("entao... " + res))
        .then(res => res)
        .then(res => res + " HI")
}

const exec = async () => awaitForSleep(5).then(res => res) 
exec().then(res => console.log("Mais um " + res))

awaitForSleep().then(res => console.log("retorno: ", res))

console.log("Nao preciso esperar")