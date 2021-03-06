const hapi = require('hapi');

const server = new hapi.Server();

server.connection({host: '127.0.0.1', port: '3000'});


server.route({
   path: '/',
   method: 'GET',
   handler(req,reply){
       reply('Welcome to HapiJs course!!');
   }
});

server.route({
    path: '/companies',
    method:'GET',
    handler(req,reply){
        reply('Welcome to Companies route');
    }
});


server.register({
    register: require('good'),
    options:{
        reporters: {
            myConsoleReporter: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{log: '*', response: '*'}]
            }, {
                module: 'good-console'
            }, 'stdout'],
        }
    }
},err => {
    if(err){
        throw err;
    }
    server.start(err => {
        if(err){
            throw err;
        }
        console.log(`Server Running at PORT ${server.info.port}`);
    });
});
