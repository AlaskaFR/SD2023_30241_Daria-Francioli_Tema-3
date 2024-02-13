package com.example.user.service;

import com.example.user.model.User;
import com.example.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Class for the logic behind UserController
 */
@Service
@AllArgsConstructor
public class UserService {
    UserRepository userRepository;

//    @Autowired
//    public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }

    public List<User> findAll() {
        List<User> users = userRepository.findAll();
        return users;
    }

    public User login(String email, String password) {
        Optional<User> loggedUser = userRepository.findByEmail(email);
        if (loggedUser.isPresent()) {
            User user = loggedUser.get();
            if (user.getPassword().compareTo(password) != 0)
                return null;
            return user;
        }
        return null;
    }


    public User findById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (!userOptional.isPresent()) {
            throw new RuntimeException(User.class.getSimpleName() + " with id: " + id);
        }
        return userOptional.get();
    }

    public User insert(User user) {
        User newUser = userRepository.save(user);
        if(newUser==null)
        {
            System.out.println("error");
        }
        return newUser;
    }

    public User update(Long id, User user) {
        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isEmpty()){
            return null;
        }
        User updateUser = userOptional.get();
        updateUser.setEmail(user.getEmail());
        updateUser.setName(user.getName());
        updateUser.setPassword(user.getPassword());
        updateUser.setRole(user.getRole());
        updateUser = userRepository.save(updateUser);
        return updateUser;
    }

    public User delete(Long id) {
        User deleteUser = findById(id);
        if (deleteUser!=null)
        {
            userRepository.delete(deleteUser);
        }
        return deleteUser;
    }
}
