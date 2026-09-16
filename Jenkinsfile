pipeline{
   agent any

   stages {

      stage('Install Dependencies') {
        steps{
          sh 'cd backend && npm ci'
         }
      }
      stage('Hello') {
        steps {
            echo 'Taskflow CI/CD pipeline started!'

            }
          }
        }
     }
