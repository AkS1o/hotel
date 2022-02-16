package hotel.controllers;

import hotel.entities.User;
import hotel.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public User getById(@PathVariable("id") int id) {
        return userRepository.findById(id).get();
    }

    @GetMapping("/")
    public Page<User> getAll(int page) {
        Pageable pageRequest = PageRequest.of(page, 10);
        return userRepository.findAll(pageRequest);
    }
}
