pipeline {
    agent {
        docker {
            label 'docker'
            image 'node:20.11.1-alpine3.19'
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'date'
                sh 'node --version'
            }
        }
    }
}