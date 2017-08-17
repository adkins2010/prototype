package com.allstate.ars.compozed.roadio.configuration;

import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@EnableEurekaClient
@Profile({"uat","prod"})
public class EurekaClientConfiguration {
}
