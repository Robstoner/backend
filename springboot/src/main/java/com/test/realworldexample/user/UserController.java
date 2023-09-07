package com.test.realworldexample.user;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.test.realworldexample.exceptions.MissingItemException;
import com.test.realworldexample.exceptions.WrongArgumentException;
import com.test.realworldexample.product.Product;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserServiceI userService;

    @GetMapping("/")
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable("userId") String id) {
        return userService.getUser(id);
    }

    @GetMapping(value = "/{userId}/avatar", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getUserAvatar(@PathVariable("userId") String id) throws IOException {
        byte[] image = userService.getUserAvatar(id);

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }

    @GetMapping("/{userId}/products")
    public List<Product> getUserProducts(@PathVariable("userId") String id) {
        return userService.getUserProducts(id);
    }

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public User postMethodName(@RequestParam("file") MultipartFile file,
            @RequestParam Map<String, String> body) {
        User user = new User();
        if (body.get("firstName") != null)
            user.setFirstName(body.get("firstName"));
        else
            throw new MissingItemException("firstName");
        if (body.get("lastName") != null)
            user.setLastName(body.get("lastName"));
        else
            throw new MissingItemException("lastName");
        if (body.get("email") != null)
            user.setEmail(body.get("email"));
        else
            throw new MissingItemException("email");
        if (body.get("password") != null)
            user.setPassword(body.get("password"));
        else
            throw new MissingItemException("password");
        if (body.get("address") != null)
            user.setAddress(body.get("address"));

        return userService.addUser(user, file);
    }

    @PutMapping(value = "/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public User edituser(@PathVariable("userId") String id,
            @RequestParam("file") MultipartFile file,
            @RequestParam Map<String, String> body) {
        User user = new User();
        if (body.get("firstName") != null)
            user.setFirstName(body.get("firstName"));
        if (body.get("lastName") != null)
            user.setLastName(body.get("lastName"));
        if (body.get("email") != null)
            user.setEmail(body.get("email"));
        if (body.get("address") != null)
            user.setAddress(body.get("address"));

        return userService.editUser(id, user, file);
    }

    @PutMapping(value = "/{userId}/products")
    public User addProducts(@PathVariable("userId") String id, @RequestBody Map<String, String> body) {
        if (body.get("products") != null) {
            List<String> products = Arrays.asList(body.get("products").split(","));
            return userService.addProducts(id, products);
        } else
            throw new MissingItemException("products");
    }

    @PutMapping(value = "/{userId}/avatar")
    public User changeAvatar(@PathVariable("userId") String id, @RequestParam("file") MultipartFile file) {
        return userService.changeAvatar(id, file);
    }

    @PutMapping(value = "/{userId}/password")
    public void changePassword(@PathVariable("userId") String id,
            @RequestBody Map<String, String> body) {
        if (body.get("password") != null)
            userService.changePassword(id, body.get("password"));
        else
            throw new MissingItemException("password");
    }

    @PutMapping(value = "/{userId}/roles")
    public User changeRoles(@PathVariable("userId") String id,
            @RequestBody Map<String, String> body) {
        if (body.get("roles") != null) {
            Role[] roles = new Role[body.get("roles").split(",").length];
            for (int i = 0; i < roles.length; i++) {
                if (Role.contains(body.get("roles").split(",")[i]))
                    roles[i] = Role.valueOf(body.get("roles").split(",")[i].toUpperCase());
                else
                    throw new WrongArgumentException("roles");
            }

            return userService.changeRoles(id, roles);
        } else
            throw new MissingItemException("roles");
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") String id) {
        userService.deleteUser(id);
    }
}
