package com.test.realworldexample.files;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;

@Service
public class FileServiceLocal implements FileServiceI{

    private final Path root = Paths.get("uploads");

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    public String save(MultipartFile file, String folder) {

        try {
            //check if folder exists
            if (!Files.exists(root.resolve(folder))) {
                Files.createDirectories(root.resolve(folder));
            }
            try {
                String[] split = file.getOriginalFilename().split("\\.");
                String filename = split[0] + "-" + System.currentTimeMillis() + "." + split[1];

                Files.copy(file.getInputStream(), this.root.resolve(folder).resolve(filename));

                return folder + "/" + filename;
            } catch (Exception e) {
                throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");

        }

    }

    public byte[] load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource.getContentAsByteArray();
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public void delete(String filename) {
        try {
            Files.deleteIfExists(root.resolve(filename));
        } catch (IOException e) {
            throw new RuntimeException("Could not delete the file. Error: " + e.getMessage());
        }
    }
}
