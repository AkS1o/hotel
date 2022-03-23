package hotel.DTO.auth;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.validation.constraints.Email;

@Data
public class AuthRequest {
    @NotNull
    @Email
    private String username;
    @NotNull
    private String password;
}
