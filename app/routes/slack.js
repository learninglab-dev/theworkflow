var express = require('express');
var router = express.Router();


function sendMessageToSlackResponseURL(responseURL, JSONmessage){
    var postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error){
            // handle errors as you see fit
        }
    })
}

router.post('/slack-marker', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with empty 200 status code
    var reqBody = req.body
    var responseURL = reqBody.response_url
    if (reqBody.token != process.env.VERIFICATION_TOKEN){
        res.status(403).end("Access forbidden")
    }else{
        var message = {
            "text": "This is your first interactive message",
            "attachments": [
                {
                    "text": "Building buttons is easy right?",
                    "fallback": "Shame... buttons aren't supported in this land",
                    "callback_id": "button_tutorial",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "120",
                            "text": "2 minutes ago",
                            "type": "button",
                            "value": "yes"
                        },
                        {
                            "name": "60",
                            "text": "1 minute ago",
                            "type": "button",
                            "value": "no"
                        },
                        {
                            "name": "30",
                            "text": "30 seconds ago",
                            "type": "button",
                            "value": "maybe",
                            "style": "danger"
                        }
                    ]
                }
            ]
        }
        sendMessageToSlackResponseURL(responseURL, message)
    }
})


router.post('/marker-button', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with 200 status
    var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    var message = {
        "text": actionJSONPayload.user.name+" clicked: "+actionJSONPayload.actions[0].name,
        "replace_original": false
    }
    console.log('response_url from actionJSONPayload:');
    console.log(actionJSONPayload.response_url);
    sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
    mdb.collection('button-presses').save(req.body, function(err, result){
       if (err) return console.log(err)
       else {
         console.log('saved to the database');
       }
    });
})

module.exports = router;
