var url = 'https://api.trello.com/1/'
var request = require("request");


module.exports = class Trello {
    constructor(keys){
        this.key = keys.key;
        this.token = keys.token;
        this.board = keys.id;
        this.auth = `?key=${this.key}&token=${this.token}`;
    }

    get(obj, req, res){
        var response;
        switch (obj.name){
            case 'lists': {
                request({method: 'GET', url: `${url}boards/${this.board}/lists/${this.auth}`}, function (error, _response, body) {
                    if (error) throw new Error(error);
                    response = (JSON.parse(body)).map(function (val) {return {id: val.id, name: val.name}});
                    res.send(response);

                });
                break;
            }
            case 'list':{
                request({method: 'GET', url: `${url}lists/${obj.id}/cards${this.auth}`}, function (error, _response, body) {
                    if (error) throw new Error(error);
                    response = (JSON.parse(body)).map(function(val){return {id: val.id, name: val.name, votes: val.badges.votes}});
                    response.sort(function(a,b){return b.votes - a.votes})
                    res.send(response);
                });
                break;
            }
        }
    }
};
