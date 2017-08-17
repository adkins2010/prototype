#!/usr/bin/env groovy
def docker_registry

node {
    docker_registry = env.DOCKER_REGISTRY
    checkout scm
}

docker.image(docker_registry + "/compozed/ci-base:0.8").inside() {
    env.GRADLE_USER_HOME = '.'
    env.APPLICATION_NAME = 'RoadIo-Prototype'
    env.ARTIFACT_NAME = 'RoadIo-Prototype-prod'

    stage("Build") {
        sh '''
            ./gradlew clean build
        '''
    }

    withCredentials([
            [
                    $class          : 'UsernamePasswordMultiBinding',
                    credentialsId   : 'b3a42544-184d-44dc-b8ab-20ab2fb006f0',
                    passwordVariable: 'PASSWORD',
                    usernameVariable: 'USERNAME'
            ]]) {

        stage("Deploy") {
            sh '''
        set -e +x
        cf login -a api.cf.nonprod-mpn.ro11.allstate.com -u ${USERNAME} -p ${PASSWORD} --skip-ssl-validation
        cf target -o ARS-RoadIO -s DEV
        cf push -f manifest-dev.yml -p "build/libs/${ARTIFACT_NAME}-0.0.${BUILD_NUMBER}.jar"
        '''
        }

        stage("Publish to Artifactory") {
            sh '''
          set -e +x
          ./gradlew publish
        '''
        }

        input 'Deploy to UAT?'

        stage("Deploy-UAT") {
            def manifest_uat = readFile 'manifest-uat.yml'
            step([
                    $class          : 'ConveyorJenkinsPlugin',
                    applicationName : "${APPLICATION_NAME}",
                    artifactURL     : "https://artifactory.allstate.com/artifactory/libs-release-local/com/allstate/ars/compozed/${ARTIFACT_NAME}/0.0.${env.BUILD_NUMBER}/${ARTIFACT_NAME}-0.0.${env.BUILD_NUMBER}.jar",
                    environment     : 'non-prod',
                    manifest        : "${manifest_uat}",
                    organization    : 'ARS-RoadIO',
                    space           : 'UAT',
                    serviceNowGroup : 'XP_IS_CHG',
                    serviceNowUserID: env.USERNAME,
                    username        : env.USERNAME,
                    password        : env.PASSWORD
            ])
        }

        input 'Deploy to production?'

        stage("Deploy-Prod") {
            def manifest_prod = readFile 'manifest-prod.yml'
            step([
                    $class          : 'ConveyorJenkinsPlugin',
                    applicationName : "${APPLICATION_NAME}",
                    artifactURL     : "https://artifactory.allstate.com/artifactory/libs-release-local/com/allstate/ars/compozed/${ARTIFACT_NAME}/0.0.${env.BUILD_NUMBER}/${ARTIFACT_NAME}-0.0.${env.BUILD_NUMBER}.jar",
                    environment     : 'prod-mpn',
                    manifest        : "${manifest_prod}",
                    organization    : 'ARS-Membership',
                    space           : 'PROD',
                    serviceNowGroup : 'XP_IS_CHG',
                    serviceNowUserID: env.USERNAME,
                    username        : env.USERNAME,
                    password        : env.PASSWORD
            ])
        }
    }

}