pipeline {
    agent any
    stages {
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
    }
}