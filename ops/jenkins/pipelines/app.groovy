import javaposse.jobdsl.dsl.DslFactory
 
class Pipeline {
  String name
  String description
  String displayName
  String branchesName
  String urlRepo
  String credentialsId
  String jenkinsfile

  void build(DslFactory dslFactory) {
    def job = dslFactory.pipelineJob(name) {
      description(description)
      displayName(displayName)
      definition {
        cpsScm {
          scm {
            git {
              branches(branchesName)
              remote {
                url(urlRepo)
                credentials(credentialsId)
              }
            }
            scriptPath(jenkinsfile)
            lightweight(true)
          }
        }
      }
      // triggers {
      //   scm('H/5 * * * *')
      // }
    }
  }
}

def server = new Pipeline(
  description: 'Pipeline do backend do aplicativo Covid19 Models',
  name: 'Covid19 Models (server)',
  displayName: 'Covid19 Models (server)',
  branchesName: 'master',
  urlRepo: 'https://gitlab.com/??',
  credentialsId: 'gitlab',
  jenkinsfile: 'ops/jenkins/pipelines/server.Jenkinsfile'
).build(this);

def client = new Pipeline(
  description: 'Pipeline do frontend do aplicativo Covid19 Models',
  name: 'Covid19 Models (client)',
  displayName: 'Covid19 Models (client)',
  branchesName: 'master',
  urlRepo: 'https://gitlab.com/??',
  credentialsId: 'gitlab',
  jenkinsfile: 'ops/jenkins/pipelines/client.Jenkinsfile'
).build(this);
