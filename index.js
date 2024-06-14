const SMTPServer = require('smtp-server').SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session,callBack){
        console.log('Connection established',session.id);
        callBack();
    },

    onMailFrom(address,session,callBack){
        console.log('Mail from:',address.address,session.id);
        callBack();
    },

    onRcptTo(address,session,callBack){
        console.log('Mail to:',address.address,session.id);
        callBack();
    },

    onData(stream,session,callBack){
        console.log('Data:',session.id);
        stream.on("data",(data)=>console.log(`Received ${data.length} bytes`,data.toString()));
        stream.on('end',callBack);
    }
});

server.listen(25,()=>console.log('SMTP Server is running on port 25'));