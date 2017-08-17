#!/usr/bin/env groovy
def docker_registry

node {
    docker_registry = env.DOCKER_REGISTRY
    checkout scm
}

docker.image(docker_registry + "/compozed/ci-base:0.8").inside() {
    env.GRADLE_USER_HOME = '.'
    env.ARTIFACT_NAME = 'RoadIo-Prototype-dev'
    env.APPLICATION_NAME = 'RoadIo-Prototype-dev'

    stage("Build") {
        sh '''
            ./gradlew clean build
            ./gradlew sourcesJar
        '''
    }

    stage("Code Quality") {
        sh '''
              set -e
              set -x
              ./gradlew sonarqube
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
    }

    withCredentials([
            [
                    $class          : 'UsernamePasswordMultiBinding',
                    credentialsId   : '4b746c7a-9eda-4420-9a1f-2e5857f06272',
                    passwordVariable: 'VERACODE_SECRET',
                    usernameVariable: 'VERACODE_ID'
            ]
    ]) {
        stage('Veracode Scan') {
            veracode applicationName: "${APPLICATION_NAME}",
                    canFailJob: false,
                    createProfile: true,
                    criticality: 'Medium',
                    debug: true,
                    copyRemoteFiles: true,
                    fileNamePattern: '',
                    useProxy: false,
                    replacementPattern: '',
                    createSandbox: true,
                    sandboxName: "${APPLICATION_NAME}-${BUILD_NUMBER}",
                    scanExcludesPattern: '',
                    scanIncludesPattern: '',
                    scanName: "\$buildnumber-\$timestamp",
                    uploadExcludesPattern: '',
                    uploadIncludesPattern: "build/libs/${ARTIFACT_NAME}-sources-0.0.${BUILD_NUMBER}.jar",
                    useIDkey: true,
                    vid: env.VERACODE_ID,
                    vkey: env.VERACODE_SECRET
        }
    }
}