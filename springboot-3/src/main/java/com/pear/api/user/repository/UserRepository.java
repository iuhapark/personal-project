package com.pear.api.user.repository;

import com.pear.api.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAllByOrderByIdDesc();

    @Modifying
    @Query("update users a set a.token = :token where a.id = :id")
    void modifyTokenById(@Param("id") Long id, @Param("token") String token);

    @Modifying
    @Query("update users a set a.balance = a.balance + :balance where a.id = :id")
    void addBalanceById(@Param("id") Long id, @Param("balance") Long balance);

    @Modifying
    @Query("update users a set a.balance = a.balance - :balance where a.id = :id")
    void subtractBalanceByIdMinus(@Param("id") Long id, @Param("balance") Long balance);

    @Query("select count(id) as count from users where email =:email")
    Integer existsByEmail(@Param("email") String email);

    @Query("select a from users a where a.email = :email")
    Optional<User> findByEmail(String email);

}
