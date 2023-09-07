package com.test.realworldexample.files;

import org.springframework.web.multipart.MultipartFile;

public interface FileServiceI {
    public void init();

    public String save(MultipartFile file, String folder);

    public byte[] load(String filename);

    public void delete(String filename);
}
