package hotel.loader;

import hotel.constants.Roles;
import hotel.entities.Role;
import hotel.entities.User;
import hotel.repositories.RoleRepository;
import hotel.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public DatabaseLoader(UserRepository userRepository,
                          RoleRepository roleRepository) {
        this.roleRepository=roleRepository;
        this.userRepository=userRepository;
    }

    @Override
    public void run(String... args) throws  Exception{
        if(this.roleRepository.count()==0)
        {
            this.roleRepository.save(new Role(Roles.Admin));
            this.roleRepository.save(new Role(Roles.User));
        }

        if(this.userRepository.count()==0)
        {
            PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            User user = new User();
            user.setUsername("semen@gmail.com");
            user.setPassword(encoder.encode("123456"));
            user.setRoles(Arrays.asList(
                    roleRepository.findByName(Roles.Admin)));
            this.userRepository.save(user);
        }
    }
}
