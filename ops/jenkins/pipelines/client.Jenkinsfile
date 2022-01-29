node {
  def to = emailextrecipients([
    [$class: 'CulpritsRecipientProvider'],
    [$class: 'DevelopersRecipientProvider'],
    [$class: 'RequesterRecipientProvider']
  ])
  def commit_id
  def nodeContainer = docker.image('node:14.14.0')
  nodeContainer.pull()

  try {
    stage('preparation') {
      checkout scm
      sh "git rev-parse --short HEAD > .git/commit-id"                        
      commit_id = readFile('.git/commit-id').trim()
    }
    stage('test') {
      dir('client') {
        nodeContainer.inside {
          sh 'npm i --only=dev'
          // sh 'npm test'
        }
      }
    }
    stage('docker build/push') {
      dir('server') {
        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
          def app = docker.build("rafaelbruno/covid19-models-client:${commit_id}", '.').push('latest')
        }
      }
    }
  } catch (e) {
    currentBuild.result = "FAILURE";
    def subject = "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} ${currentBuild.result}"
    def content = '${JELLY_SCRIPT,template="html"}'

    if (to != null && !to.isEmpty()) {
      emailext(
        body: content,
        mimeType: 'text/html',
        replyTo: '$DEFAULT_REPLYTO',
        subject: subject,
        to: to, 
        attachLog: true
      )
    }

    // slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")

    throw e;
  }
}
