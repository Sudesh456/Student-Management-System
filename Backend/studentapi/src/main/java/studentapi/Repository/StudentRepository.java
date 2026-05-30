package studentapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import studentapi.entity.Student;


public interface StudentRepository extends JpaRepository<Student, Long> {
//Long not int andCRUD is ready
}