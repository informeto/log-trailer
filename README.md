## **Remote Log Trailer**
View realtime logs generated in a remote server using socket connections.

#### **Setting up Project**

Node.js and npm are essential.


```
git clone https://github.com/pushpann/log-trailer.git
```

Install the dependencies:

```
npm install
```


Run the server

```
node app.js
```

Open the client site on 
```
http://localhost:3000

```


If you want to test the streamer, you can also use writeLogs script, just mention files you want the writer to add logs to. By default it adds 20 lines to the log file

```
sh writeLogs.sh one.log two.log three.log

```


