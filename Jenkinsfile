pipeline {
    agent{
        label 'agent1'
    }
    stages {

        stage('Test') {
            agent{
                docker {
                    image 'node:20.11.1-alpine3.19'
                }
            }
            steps {
                sh 'node --version'
                sh 'echo run tests'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t fakestore-ui .'
                sh 'docker tag fakestore-ui:latest abhisheklale/fakestore-fe:latest'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DockerCreds', passwordVariable: 'PASS', usernameVariable: 'USERNAME')]){
                    sh "echo $PASS | docker login -u $USERNAME --password-stdin"
                    sh 'docker push abhisheklale/fakestore-fe:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def dockerCmd = '''
                    echo $PASS | docker login -u $USERNAME --password-stdin
                    docker pull abhisheklale/fakestore-fe:latest
                    sudo docker run -itd --name faktstore_fe -p 3000:3000 abhisheklale/fakestore-fe:latest
                    '''
                    sshagent(['web-server-key']) {
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@3.92.25.217 ${dockerCmd}"
                    }
                }
            }
        }
    }
}