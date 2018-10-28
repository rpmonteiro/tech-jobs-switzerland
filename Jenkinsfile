#!/usr/bin/env groovy

// pipeline {
//     environment {
//         DOCKER = credentials('docker-hub')
//     }
//     agent {
//         docker {
//             image 'node'
//             args '-u root'
//         }
//     }
//     stages {
//         // Building Test Images
//         stage('BUILD') {
//             parallel {
//                 stage('App image') {
//                     steps {
//                         echo 'Building app image...'
//                         sh 'docker build -f Dockerfile -t jobs-backend-dev:trunk .'
//                     }
//                 }
//                 stage('Test-Unit Image') {
//                     steps {
//                         sh 'docker build -f test-image/Dockerfile \
//                         -t test-image:latest .'
//                     }
//                 }
//             }
//             post {
//                 failure {
//                     echo 'This build has failed. See logs for details.'
//                 }
//             }
//         }
//         // Performing Software Tests
//         stage('TEST') {
//             parallel {
//                 stage('Mocha Tests') {
//                     steps {
//                         sh 'docker run --name jobs-backend-dev --network="bridge" -d \
//                         -p 9000:9000 jobs-backend-dev:trunk'
//                         sh 'docker run --name test-image -v $PWD:/JUnit --network="bridge" \
//                         --link=jobs-backend-dev -d -p 9001:9000 \
//                         test-image:latest'
//                     }
//                 }
//                 stage('Quality Tests') {
//                     steps {
//                         sh 'docker login --username $DOCKER_USR --password $DOCKER_PSW'
//                         sh 'docker tag jobs-backend-dev:trunk <DockerHub Username>/jobs-backend-dev:latest'
//                         sh 'docker push <DockerHub Username>/jobs-backend-dev:latest'
//                     }
//                 }
//             }
//             post {
//                 success {
//                     echo 'Build succeeded.'
//                 }
//                 unstable {
//                     echo 'This build returned an unstable status.'
//                 }
//                 failure {
//                     echo 'This build has failed. See logs for details.'
//                 }
//             }
//         }
//         // Deploy if on master
//         stage('DEPLOY') {
//             when {
//                 branch 'master'
//             }
//                 steps {
//                     retry(3) {
//                         timeout(time:10, unit: 'MINUTES') {
//                             sh 'docker tag jobs-backend-dev:trunk <DockerHub Username>/jobs-backend-prod:latest'
//                             sh 'docker push <DockerHub Username>/jobs-backend-prod:latest'
//                             sh 'docker save <DockerHub Username>/jobs-backend-prod:latest | gzip > jobs-backend-prod-golden.tar.gz'
//                         }
//                     }
//                 }
//                 post {
//                     failure {
//                         sh 'docker stop jobs-backend-dev test-image'
//                         sh 'docker system prune -f'
//                         deleteDir()
//                     }
//                 }
//         }
//         // JUnit reports and artifacts saving
//         stage('REPORTS') {
//             steps {
//                 junit 'reports.xml'
//                 archiveArtifacts(artifacts: 'reports.xml', allowEmptyArchive: true)
//                 archiveArtifacts(artifacts: 'jobs-backend-prod-golden.tar.gz', allowEmptyArchive: true)
//             }
//         }
//         // Doing containers clean-up to avoid conflicts in future builds
//         stage('CLEAN-UP') {
//             steps {
//                 sh 'docker stop jobs-backend-dev test-image'
//                 sh 'docker system prune -f'
//                 deleteDir()
//             }
//         }
//     }
// }


pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t jobs-backend:latest .'
        sh 'docker-compose build'
        sh 'docker-compose run web npm install'
        sh 'docker-compose run -e NODE_ENV=test --rm web npm run db:create && npm run db:migrate up'
      }
    }
    stage('Tests') {
      steps {
        parallel(
          "Unit Tests": {
            sh 'docker-compose run --name unit --rm web npm run test'
            
          },
          "Feature tests": {
            sh 'docker-compose run --name feature --rm web npm run test'
          }
        )
      }
    }

    stage('Deploy to Staging') {
      when {
        expression { env.BRANCH_NAME == 'master' }
      }
      steps {
        echo 'todo: deploy to staging'
      }
    }

    stage('Create feature environment') {
      when {
        expression { env.BRANCH_NAME != 'master' }
      }

      steps {
        echo 'todo: create custom environment'
      }
    }
  }
}