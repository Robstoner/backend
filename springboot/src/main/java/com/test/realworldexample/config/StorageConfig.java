// package com.test.realworldexample.config;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import software.amazon.awssdk.auth.credentials.AwsCredentials;
// import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
// import software.amazon.awssdk.regions.Region;
// import software.amazon.awssdk.services.s3.S3Client;

// @Configuration
// public class StorageConfig {

//     @Value("${aws.access.key}")
//     private String accessKey;
//     @Value("${aws.secret.access.key}")
//     private String accessSecret;
//     @Value("${aws.region}")
//     private String region;

//     @Bean
//     public S3Client s3Client() {
//         AwsCredentials credentials = new AwsCredentials() {
//             @Override
//             public String accessKeyId() {
//                 return accessKey;
//             }

//             @Override
//             public String secretAccessKey() {
//                 return accessSecret;
//             }
//         };

//         return S3Client.builder()
//                 .credentialsProvider(StaticCredentialsProvider.create(credentials))
//                 .region(Region.of(region))
//                 .build();
//     }
// }
