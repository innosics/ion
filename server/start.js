const cluster = require('cluster'),
      stopSignals = [
        'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
        'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
      ],
      production = process.env.NODE_ENV == 'production';



process.env.OPENSHIFT_MONGODB_DB_HOST = process.env.OPENSHIFT_MONGODB_DB_HOST || "localhost";
process.env.OPENSHIFT_MONGODB_DB_PORT = process.env.OPENSHIFT_MONGODB_DB_PORT || "27017";
process.env.OPENSHIFT_MONGODB_DB_USERNAME = process.env.OPENSHIFT_MONGODB_DB_USERNAME || "api";
process.env.OPENSHIFT_MONGODB_DB_PASSWORD = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || "password";

process.env.client_id = 'AF0E16BFAFAA4A37916ECE25ECD420A2';
process.env.client_secret = '9793FBBE8FD84615B31D4E68FDD4063C';

console.log('MONGODB_DB_HOST: ' + process.env.OPENSHIFT_MONGODB_DB_HOST);
console.log('MONGODB_DB_PORT: ' + process.env.OPENSHIFT_MONGODB_DB_PORT);


let stopping = false;

cluster.on('disconnect', function(worker) {
  if (production) {
    if (!stopping) {
      cluster.fork();
    }
  } else {
    process.exit(1);
  }
});

if (cluster.isMaster) {
  const workerCount = process.env.NODE_CLUSTER_WORKERS || 2;
  console.log(`Starting Innosics API ${workerCount} workers...`);
  for (let i = 0; i < workerCount; i++) {
    cluster.fork();
  }
  if (production) {
    stopSignals.forEach(function (signal) {
      process.on(signal, function () {
        console.log(`Got ${signal}, stopping Innosics API workers...`);
        stopping = true;
        cluster.disconnect(function () {
          console.log('All workers stopped, exiting.');
          process.exit(0);
        });
      });
    });
  }
} else {
  require('./app.js');
}
