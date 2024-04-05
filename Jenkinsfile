pipeline {
    agent none
    stages {
        stage('test-docker') {
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19'
                }
            }
            steps {
                sh 'node image pull'
            }
        }

        stage('Build') { 
            steps {
                sh 'date'
                sh 'node --version'
            }
        }
    }
}