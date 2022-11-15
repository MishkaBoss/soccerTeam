import { storageService } from "./storageService";
export const playerService = {
    getPlayers,
    getPlayerById,
    deletePlayer,
    savePlayer,
    getEmptyPlayer,
    _logCurrentUser
}

const STORAGE_KEY = 'players'

const players = [
    {
        "uid": "5a56640269f443a5d64b32ca",
        "name": "Ochoa Hyde",
        "email": "ochoahyde@renovize.com",
        "phone": "+1 (968) 593-3824"
    },
    {
        "uid": "5a5664025f6ae9aa24a99fde",
        "name": "Hallie Mclean",
        "email": "halliemclean@renovize.com",
        "phone": "+1 (948) 464-2888"
    },
    {
        "uid": "5a56640252d6acddd183d319",
        "name": "Parsons Norris",
        "email": "parsonsnorris@renovize.com",
        "phone": "+1 (958) 502-3495"
    },
    {
        "uid": "5a566402ed1cf349f0b47b4d",
        "name": "Rachel Lowe",
        "email": "rachellowe@renovize.com",
        "phone": "+1 (911) 475-2312"
    },
    {
        "uid": "5a566402abce24c6bfe4699d",
        "name": "Dominique Soto",
        "email": "dominiquesoto@renovize.com",
        "phone": "+1 (807) 551-3258"
    },
    {
        "uid": "5a566402a6499c1d4da9220a",
        "name": "Shana Pope",
        "email": "shanapope@renovize.com",
        "phone": "+1 (970) 527-3082"
    },
    {
        "uid": "5a566402f90ae30e97f990db",
        "name": "Faulkner Flores",
        "email": "faulknerflores@renovize.com",
        "phone": "+1 (952) 501-2678"
    },
    {
        "uid": "5a5664027bae84ef280ffbdf",
        "name": "Holder Bean",
        "email": "holderbean@renovize.com",
        "phone": "+1 (989) 503-2663"
    },
    {
        "uid": "5a566402e3b846c5f6aec652",
        "name": "Rosanne Shelton",
        "email": "rosanneshelton@renovize.com",
        "phone": "+1 (968) 454-3851"
    },
    {
        "uid": "5a56640272c7dcdf59c3d411",
        "name": "Pamela Nolan",
        "email": "pamelanolan@renovize.com",
        "phone": "+1 (986) 545-2166"
    },
    {
        "uid": "5a5664029a8dd82a6178b15f",
        "name": "Roy Cantu",
        "email": "roycantu@renovize.com",
        "phone": "+1 (929) 571-2295"
    },
    {
        "uid": "5a5664028c096d08eeb13a8a",
        "name": "Ollie Christian",
        "email": "olliechristian@renovize.com",
        "phone": "+1 (977) 419-3550"
    },
    {
        "uid": "5a5664026c53582bb9ebe9d1",
        "name": "Nguyen Walls",
        "email": "nguyenwalls@renovize.com",
        "phone": "+1 (963) 471-3181"
    },
    {
        "uid": "5a56640298ab77236845b82b",

        "name": "Glenna Santana",
        "email": "glennasantana@renovize.com",
        "phone": "+1 (860) 467-2376"
    },
    {
        "uid": "5a56640208fba3e8ecb97305",
        "name": "Malone Clark",
        "email": "maloneclark@renovize.com",
        "phone": "+1 (818) 565-2557"
    },
    {
        "uid": "5a566402abb3146207bc4ec5",
        "name": "Floyd Rutledge",
        "email": "floydrutledge@renovize.com",
        "phone": "+1 (807) 597-3629"
    },
    {
        "uid": "5a56640298500fead8cb1ee5",
        "name": "Grace James",
        "email": "gracejames@renovize.com",
        "phone": "+1 (959) 525-2529"
    },
    {
        "uid": "5a56640243427b8f8445231e",
        "name": "Tanner Gates",
        "email": "tannergates@renovize.com",
        "phone": "+1 (978) 591-2291"
    },
    {
        "uid": "5a5664025c3abdad6f5e098c",
        "name": "Lilly Conner",
        "email": "lillyconner@renovize.com",
        "phone": "+1 (842) 587-3812"
    }
]

var gPlayers = _loadPlayer()

function sort(arr) {
    return arr.sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
        }

        return 0;
    })
}

function getPlayers(filterBy) {
    console.log(`getPlayers ~ filterBy`, filterBy)
    // console.log(`getPlayers ~ filterBy.term`, filterBy.term)

    return new Promise((resolve, reject) => {
        var playersToReturn = gPlayers
        console.log(gPlayers);
        if (filterBy && filterBy.term) {


            playersToReturn = filter(filterBy.term)

        }
        resolve(sort(playersToReturn))

    })
}

function getPlayerById(id) {
    return new Promise((resolve, reject) => {
        const player = gPlayers.find(player => player.uid === id)
        player ? resolve(player) : reject(`Player id ${id} not found!`)
    })
}

function deletePlayer(id) {
    return new Promise((resolve, reject) => {
        const index = gPlayers.findIndex(player => player.uid === id)
        if (index !== -1) {
            gPlayers.splice(index, 1)
        }

        storageService.store(STORAGE_KEY, gPlayers)
        resolve(players)
    })
}

function _updatePlayer(player) {
    return new Promise((resolve, reject) => {
        const index = gPlayers.findIndex(c => player.uid === c.uid)
        console.log(`returnnewPromise ~ index`, index)
        if (index !== -1) {
            gPlayers[index] = player
        }
        storageService.store(STORAGE_KEY, gPlayers)
        resolve(player)
    })
}

function savePlayer(currUser) {
    console.log(currUser)
    return new Promise((resolve, reject) => {
        const test = gPlayers.some(player => player.uid === currUser.uid)
        if (!test) {

            gPlayers.push(currUser)
            storageService.store(STORAGE_KEY, gPlayers)
            resolve(currUser)
        } else {
            alert('already confirmed')
        }
    })
}

// function savePlayer(player) {
//     return player.uid ? _updatePlayer(player) : _addPlayer(player)
// }

function getEmptyPlayer() {
    return {
        name: '',
        email: '',
        phone: ''
    }
}

function filter(term) {
    term = term.toLocaleLowerCase()
    return players.filter(player => {
        return player.name.toLocaleLowerCase().includes(term) ||
            player.phone.toLocaleLowerCase().includes(term) ||
            player.email.toLocaleLowerCase().includes(term)
    })
}



function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _loadPlayer() {
    let playersToLoad = storageService.load(STORAGE_KEY)
    if (!playersToLoad || !playersToLoad.length) playersToLoad = players
    storageService.store(STORAGE_KEY, playersToLoad)
    return playersToLoad
}

function _logCurrentUser(user) {
    console.log(user);
}