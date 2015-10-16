# Funifier Api

Simple library for [funifier](http://www.funifier.com).

```js
var Funifier = require('funifier')
var funifier = new Funifier({apiKey:'my_api_key'});

funifier.authenticate({player: 'my_player', password : 'my_password', auth_mode : 'PASSWORD'}).then(function(){
    console.log('user logged');
}).catch(function(err){
    console.log(err);
});
```


## Usage

For more information go to [Online Documentation](http://doc.funifier.com).

#### Methods
* `getApiKey` : function - return apiKey.
* `getAccessToken` : function - return access token.
* `get` : function - return superagent request.
* `post` : function - return superagent request.
* `del` : function - return superagent request.
* `put` : function - return superagent request.
* `track` : function - return Q promisse.
* `authenticate` : function - return Q promisse.
* `logout` : function - return Q promisse.


### Track
```js
var Funifier = require('funifier')
var funifier = new Funifier({apiKey:'my_api_key'});

funifier.authenticate({player:'my_player',password:'my_password',auth_mode:'PASSWORD'}).then(function(){
    funifier.track({action:'page_view'}).then(function(){
        console.log('action track');
    });
});
```

### Widget data
```js
var Funifier = require('funifier')
var funifier = new Funifier({apiKey:'my_api_key'});

funifier.authenticate({player:'my_player',password:'my_password',auth_mode:'PASSWORD'}).then(function(){
    funifier.get('get_widget_data').query({include_teams:true}).end(function(err,res){
        if(!err){
            console.log(res.body);
        }
    });
});
```

## Installation

```bash
$ npm install funifier
```

### Todos

 - Write Tests
 - Write more examples
 - Add Code Comments
 - Create browser version

License
----

Check in [funifier.com](http://www.funifier.com)