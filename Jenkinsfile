pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
				//replace sipl-sample-rest with your project name
                bat "npm install"
				bat "ng build --prod --base-href /sga-update-ui/"
            }
        }
		
		stage('Deploy') {
            steps {
				//replace crud-sample-rest with your intended context path
                bat "xcopy \"C:/Jenkins/workspace/SGA-UI/dist/sga-update-ui\" \"C:/Apache/Tomcat8.5/webapps/sga-update-ui\" /K /D /H /Y"
            }
        }
		
		stage('Notify') {
			steps {
				notifyBitbucket buildStatus:'', buildName:'', commitSha1: '', considerUnstableAsSuccess: false, credentialsId: '', disableInprogressNotification: false, ignoreUnverifiedSSLPeer: false, includeBuildNumberInKey: false, prependParentProjectKey: false, projectKey: '', stashServerBaseUrl: ''
			}
		}
    }
}