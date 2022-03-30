package hotel.controllers;

import hotel.DTO.auth.AuthRequest;
import hotel.DTO.auth.RegisterRequest;
import hotel.DTO.auth.UserView;
import hotel.configuration.security.JwtTokenUtil;
import hotel.configuration.security.captcha.CaptchaSettings;
import hotel.configuration.security.captcha.GoogleResponse;
import hotel.constants.Roles;
import hotel.mapper.UserMapper;
import hotel.repositories.RoleRepository;
import hotel.repositories.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestOperations;

import javax.validation.Valid;
import java.util.Arrays;

@Tag(name = "Auth")
@RestController
@RequestMapping(path = "api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenUtil jwtTokenUtil;

    private final UserMapper userMapper;

    private final CaptchaSettings captchaSettings;
    @Autowired
    private final RestOperations restTemplate;
    protected static final String RECAPTCHA_URL_TEMPLATE = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";

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

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
        try {
            String url = String.format(RECAPTCHA_URL_TEMPLATE, captchaSettings.getSecret(), request.getReCaptchaToken());
            try {
                final GoogleResponse googleResponse = restTemplate.getForObject(url, GoogleResponse.class);
                if (!googleResponse.isSuccess()) {
                    throw new Exception("reCaptcha was not successfully validated");
                }
            }
            catch (Exception rce) {
                String str = rce.getMessage();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            hotel.entities.User userdb =  userRepository.findByUsername(request.getEmail());
            if(userdb!=null)
            {
                return ResponseEntity.badRequest()
                        .body("E-mail was already registered");
            }
            PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            userdb = new hotel.entities.User();
            userdb.setUsername(request.getEmail());
            userdb.setFirstName(request.getFirstName());
            userdb.setLastName(request.getLastName());
            userdb.setPassword(encoder.encode(request.getPassword()));
            userdb.setRoles(Arrays.asList(
                    roleRepository.findByName(Roles.User)));
            this.userRepository.save(userdb);

            UserView userView = loginUser(request.getEmail(), request.getPassword());
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
