package com.test.realworldexample.product;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.test.realworldexample.exceptions.MissingItemException;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductServiceI productService;

    @GetMapping(value = "/")
    public @ResponseBody Iterable<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping(value = "/{productId}")
    public Product getProduct(@PathVariable("productId") String id) {
        return productService.getProduct(id);
    }

    @GetMapping(value = "/{productId}/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getProductImage(@PathVariable("productId") String id) throws IOException {
        byte[] image = productService.getProductImage(id);

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public @ResponseBody Product addProduct(@RequestParam("file") MultipartFile file,
            @RequestParam Map<String, String> body) {
        Product product = new Product();
        if (body.get("name") != null)
            product.setName(body.get("name"));
        else
            throw new MissingItemException("name");
        if (body.get("description") != null)
            product.setDescription(body.get("description"));
        else
            throw new MissingItemException("description");
        if (body.get("price") != null)
            product.setPrice(Double.parseDouble(body.get("price")));
        else
            throw new MissingItemException("price");
        if (body.get("category") != null)
            product.setCategory(body.get("category"));
        else
            throw new MissingItemException("category");
        if (body.get("sizes") != null)
            product.setSizes(body.get("sizes"));
        else
            throw new MissingItemException("sizes");

        return productService.addProduct(product, file);
    }

    @PutMapping(value = "/{productId}")
    public Product editProduct(@PathVariable("productId") String id, @RequestBody Product entity) {
        return productService.editProduct(id, entity);
    }

    @PutMapping(value = "/{productId}/user")
    public Product addUserToProduct(@PathVariable("productId") String id, @RequestBody Map<String, String> body) {
        if (body.get("userId") != null) 
            return productService.addUserToProduct(id, body.get("userId"));
        else
            throw new MissingItemException("userId");
    }

    @DeleteMapping(value = "/{productId}")
    public void deleteProduct(@PathVariable("productId") String id) {
        productService.deleteProduct(id);
    }

}
