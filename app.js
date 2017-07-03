var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
fileTailer = require('file-tail');
var fs = require('fs')
server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('subscribe', function (data) {
    subscribe(data.filename);
  });

  socket.on('unsubscribe', function (data) {
    unsubscribe(data.filename);
  });
});


subscriptionPool = {}

function watch_file(filename){
    if(!filename.trim()){
        return false;
    }

    filepath = 'logs/'+filename;
    if (!fs.existsSync(filepath)) {
        fs.closeSync(fs.openSync(filepath, 'w'));
    }

    ft = fileTailer.startTailing(filepath);

    ft.on('line', function(line){
        console.log(filename, ' >>> ', line);
        io.emit(filename, { 'new_line': line, 'filename': filename });
    });

    ft.on("error", function(error) {
      console.log('ERROR: ', error);
    });

    return ft;
}


function subscribe(filename){
    if(filename in subscriptionPool){
        subscriptionPool[filename]['count']++;
        console.log('new subscriber', filename);
    }else{

        ft = watch_file(filename);
        subscriptionPool[filename] = {'trailer' : ft, 'count': 1};

        console.log('started new filereader', filename);

        console.log(subscriptionPool[filename]);
    }


}

function unsubscribe(filename){
    if(filename in subscriptionPool){
       subscriptionPool[filename]['count']--;   
       if(subscriptionPool[filename]['count'] == 0){
          subscriptionPool[filename]['trailer'].stop(); 
          delete subscriptionPool[filename];
          console.log('exited the watcher');
       }
    }
}

















