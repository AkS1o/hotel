package hotel.controllers;

import hotel.DTO.auth.AuthRequest;
import hotel.DTO.auth.UserView;
import hotel.configuration.security.JwtTokenUtil;
import hotel.mapper.UserMapper;
import hotel.repositories.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Tag(name = "Auth")
@RestController
@RequestMapping(path = "api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;

    private final UserMapper userMapper;

    @PostMapping("/login")
    public ResponseEntity<UserView> login(@RequestBody @Valid AuthRequest authRequest) {
        try {
            UserView userView = loginUser(authRequest.getUsername(), authRequest.getPassword());
            return ResponseEntity.ok()
                    .body(userView);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    private UserView loginUser(String username, String password) throws BadCredentialsException {
        Authentication authenticate = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        username,
                        password));

        User user = (User) authenticate.getPrincipal();
        hotel.entities.User dbUser = userRepository
                .findByUsername(user.getUsername());
        UserView userView = userMapper.UserToUserView(dbUser);
        userView.setToken(jwtTokenUtil.generateAccessToken(dbUser));
        return userView;
    }
}
