import cluster, { Worker } from 'cluster';
import { CpuInfo, cpus } from 'os';

class Clusters {
  private cpus: CpuInfo[];

  constructor() {
    this.cpus = cpus();
    this.init();
  }

  private init(): void {
    if (cluster.isPrimary) {
      this.cpus.forEach((_, i) => {
        process.env.NODE_APP_INSTANCE = (i + 1).toString();
        cluster.fork();
      });

      cluster.on('listening', (worker: Worker) => {
        console.log(`Cluster ${worker.process.pid} connected`);
      });

      cluster.on('disconnect', (worker: Worker) => {
        console.log(`Cluster ${worker.process.pid} disconnected`);
      });

      cluster.on('exit', (worker: Worker) => {
        console.log(`Cluster ${worker.process.pid} exited`);
        cluster.fork();
      });
    } else {
      require('./index');
    }
  }
}

export default new Clusters();
