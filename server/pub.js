const { IgApiClient } = require('instagram-private-api')
require('dotenv').config()
const { readFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const { username, password } = process.env

const ig = new IgApiClient()

const postImage = async () => {
    try {
        ig.state.generateDevice(username)
        await ig.simulate.preLoginFlow()

        const loggedInUser = await ig.account.login(username, password)

        // uploading the image to Instagram
        const path = "./img.jpeg"
        const publishResult = await ig.publish.photo({
            file: await readFileAsync(path),
            caption: 'my first post'
        })
        
        console.log(publishResult)

    } catch (error) {
        console.log(error)
    }
}

postImage()
