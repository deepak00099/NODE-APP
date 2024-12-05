
pipeline {
    agent any  // Run on any available agent

    environment {
        // Define any necessary environment variables here
        NODE_HOME = "/usr/local/node"  // Example: define Node.js home
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Install npm dependencies
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests (if you have any tests defined)
                    echo 'Running tests...'
                    sh 'npm test'  // Make sure you have test scripts set up in package.json
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // This is just an example. Add actual build steps here.
                    echo 'Building the application...'
                    // Here, we're not really building anything for now
                    sh 'echo "Building the app..."'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy step (this could be to a server or container)
                    echo 'Deploying the application...'
                    // Example of deployment (could be replaced by actual deployment steps)
                    sh 'echo "Deploying the app to the server..."'
                }
            }
        }
    }

    post {
        always {
            // Clean up after pipeline execution (e.g., delete temporary files)
            echo 'Cleaning up...'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
