package com.test.realworldexample.user;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.test.realworldexample.product.Product;

public interface UserServiceI {
    public Iterable<User> getAllUsers();

    public User getUser(String id);

    public List<Product> getUserProducts(String id);

    public byte[] getUserAvatar(String id);

    public User addUser(User entity);

    public User addUser(User entity, MultipartFile file);

    public User editUser(String id, User entity);

    public User editUser(String id, User entity, MultipartFile file);

    public User addProducts(String id, List<String> products);

    public User changeAvatar(String id, MultipartFile file);

    public void changePassword(String id, String password);

    public User changeRoles(String id, Role[] roles);

    public void deleteUser(String id);
}
