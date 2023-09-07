package com.test.realworldexample.product;

import org.springframework.web.multipart.MultipartFile;

public interface ProductServiceI {
    public Iterable<Product> getProducts();

    public Product getProduct(String id);

    public byte[] getProductImage(String id);

    public Product addProduct(Product entity);

    public Product addProduct(Product entity, MultipartFile file);

    public Product editProduct(String id, Product entity);

    public Product editProduct(String id, Product entity, MultipartFile file);

    public void deleteProduct(String id);

    public Product addUserToProduct(String id, String string);
}
