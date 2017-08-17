#!/usr/bin/env groovy
def docker_registry

node {
    docker_registry = env.DOCKER_REGISTRY
    checkout scm
}

docker.image(docker_registry + "/compozed/ci-base:0.8").inside() {
    env.GRADLE_USER_HOME = "."
    env.SPRING_PROFILES_ACTIVE = "dev"

    //for use with mysql databases
//    stage("Initialize Database") {
//        sh '''
//            sudo service mysql start
//            mysql -h localhost -u root < membership.sql
//        '''
//    }
//
    stage("Build") {
        sh '''
            export SPRING_PROFILES_ACTIVE="dev"
            ./gradlew clean build
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
                    credentialsId   : 'e77d69fe-dc7e-4dd7-ad5e-50c7d4c06a4f',
                    passwordVariable: 'CF_PASSWORD',
                    usernameVariable: 'CF_USERNAME'
            ]]) {

        stage("Deploy") {
            sh '''
        set -e +x
        cf login -a api.cf.nonprod-mpn.ro11.allstate.com -u ${CF_USERNAME} -p ${CF_PASSWORD} --skip-ssl-validation
        cf target -o ARS-RoadIO -s DEV
        cf push -f manifest-dev.yml -p "build/libs/ROADIO-WEBAPP-TEMPLATE-0.0.${BUILD_NUMBER}.jar"
        '''
        }
    }

    withCredentials([
            [
                    $class          : 'UsernamePasswordMultiBinding',
                    credentialsId   : 'e77d69fe-dc7e-4dd7-ad5e-50c7d4c06a4f',
                    passwordVariable: 'ARTIFACTORY_PASSWORD',
                    usernameVariable: 'ARTIFACTORY_USERNAME'
            ]]) {
        stage("Publish to Artifactory") {
            sh '''
          set -e +x
          ./gradlew publish
        '''
        }
    }

    withCredentials([
            [
                    $class          : 'UsernamePasswordMultiBinding',
                    credentialsId   : 'e77d69fe-dc7e-4dd7-ad5e-50c7d4c06a4f',
                    passwordVariable: 'CF_PASSWORD',
                    usernameVariable: 'CF_USERNAME'
            ]]) {
        stage("Deploy-UAT") {
            def manifest_uat = readFile 'manifest-uat.yml'
            step([
                    $class          : 'ConveyorJenkinsPlugin',
                    applicationName : 'ROADIO-WEBAPP-TEMPLATE-UAT',
                    artifactURL     : "https://artifactory.allstate.com/artifactory/libs-release-local/com/allstate/ars/compozed/ROADIO-WEBAPP-TEMPLATE/0.0.${env.BUILD_NUMBER}/ROADIO-WEBAPP-TEMPLATE-0.0.${env.BUILD_NUMBER}.jar",
                    environment     : 'non-prod',
                    manifest        : "${manifest_uat}",
                    organization    : 'ARS-RoadIO',
                    space           : 'UAT',
                    serviceNowGroup : 'XP_IS_CHG',
                    serviceNowUserID: env.CF_USERNAME,
                    username        : env.CF_USERNAME,
                    password        : env.CF_PASSWORD
            ])
        }
    }

    checkpoint "Veracode Checkpoint"

    withCredentials([
            [
                    $class          : 'UsernamePasswordMultiBinding',
                    credentialsId   : '4b746c7a-9eda-4420-9a1f-2e5857f06272',
                    passwordVariable: 'VERACODE_SECRET',
                    usernameVariable: 'VERACODE_ID'
            ]
    ]) {
        stage('Veracode Scan') {
            veracode  applicationName: 'ROADIO-WEBAPP-TEMPLATE',
                    canFailJob: false,
                    createProfile: true,
                    criticality: 'Medium',
                    debug: true,
                    copyRemoteFiles: true,
                    fileNamePattern: '',
                    useProxy: false,
                    replacementPattern: '',
                    createSandbox: true,
                    sandboxName: 'ROADIO-WEBAPP-TEMPLATE',
                    scanExcludesPattern: '',
                    scanIncludesPattern: '',
                    scanName: "\$buildnumber-\$timestamp",
                    uploadExcludesPattern: '',
                    uploadIncludesPattern: "build/libs/ROADIO-WEBAPP-TEMPLATE-0.0.${BUILD_NUMBER}.jar",
                    useIDkey: true,
                    vid: env.VERACODE_ID,
                    vkey: env.VERACODE_SECRET
        }
    }
}