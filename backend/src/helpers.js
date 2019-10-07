const fs = require('fs')

const rm = (file) => new Promise((resolve, reject) => {

    fs.unlink(file, (err) => {

        if(err) return reject(err)

        resolve()
        
    })

})

const cp = (from, to) => new Promise((resolve, reject) => {

    fs.copyFile(from, to, (err) => {

        // e se um arquivo com esse nome já existir?

        if(err) return reject(err)

        resolve()

    })

})

const mkdir = (dir) => {


    return new Promise((resolve, reject) => {

        fs.mkdir(dir, { recursive: true }, (err) => {


            if(!err) return resolve()


            return (err.code === 'EEXIST') ? resolve() : reject(err)


        })

    })

}

module.exports = {
    cp,
    rm,
    mkdir
}