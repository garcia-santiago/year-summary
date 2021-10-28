const { Router } = require('express')
const router = Router()

const axios = require('axios')
const qs = require('qs');

//const {db_config, admin} = require('../../config')

router.post('/token', (req, res) => {

    try{
        const {code} = req.body
        const grant_type = "&grant_type=authorization_code"
        // const redirect_uri = "&redirect_uri=http://localhost:3333/" Dev
        const redirect_uri = "&redirect_uri=https://year-summary.herokuapp.com/"
        const client_id = "&client_id=8f4b90e854a8466e98424b0310ec4e63"
        const client_secret = "&client_secret=ff3e4108f830491aadd3c57b85496eb8"

        const url = "https://accounts.spotify.com/api/token?code="+code+grant_type+redirect_uri+client_id+client_secret

        let config = {
            headers: {
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }

        axios.post(url, null, config)
        .then(response => {
            console.log(response.data);
            res.status(200).send(response.data)
            resolve()
            res.end()
        })
        .catch(error => res.send(error))
    }
    catch (error){
        res.status(400).send(error)
    }
})

router.post('/trefresh', (req, res) => {


    const {refresh_token} = req.body

    const client_id = "8f4b90e854a8466e98424b0310ec4e63"
    const client_secret = "ff3e4108f830491aadd3c57b85496eb8"

    var data = qs.stringify({
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': client_id,
        'client_secret': client_secret 
      });
    var config = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        data : data
      };
      
    axios(config)
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
        res.send(error);
    });
})

module.exports = router