package com.test.realworldexample.files;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.test.realworldexample.exceptions.ItemNotFoundException;

import jakarta.annotation.PostConstruct;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

// @Service
public class FileServiceCloud implements FileServiceI {

    private final S3Client s3Client;

    public FileServiceCloud(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Value("${aws.bucket.name}")
    private String bucketName;

    @PostConstruct
    public void init() {
        return;
    }

    public String save(MultipartFile file, String folder) {

        try {
            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(folder + "/" + file.getOriginalFilename())
                    .build();

            PutObjectResponse res = s3Client.putObject(objectRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            return res.eTag();
        } catch (IOException e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    public byte[] load(String key) {
        GetObjectRequest objectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        ResponseInputStream<GetObjectResponse> res = s3Client.getObject(objectRequest);

        try {
            byte[] bytes = res.readAllBytes();
            return bytes;
        } catch (IOException e) {
            throw new ItemNotFoundException("File " + key + " from " + bucketName + " not found");
        }
    }

    public void delete(String filename) {

        DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        s3Client.deleteObject(objectRequest);
    }
}
