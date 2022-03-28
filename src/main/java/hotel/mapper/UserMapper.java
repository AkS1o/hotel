package hotel.mapper;

import hotel.DTO.auth.UserView;
import hotel.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "user.roles", ignore = true)
    UserView UserToUserView(User user);
}
