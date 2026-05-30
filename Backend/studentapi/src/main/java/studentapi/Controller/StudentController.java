package studentapi.controller;

import org.springframework.web.bind.annotation.*;//include @RestController,@GetMapping,@PostMapping,@CrossOrigin
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import studentapi.entity.Student;
import studentapi.repository.StudentRepository;

@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    //CREATE
    @PostMapping("/add")
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @GetMapping("/all") //READ
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
   
    //UPDATE Student
    @PutMapping("/update/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        return studentRepository.findById(id)
        .map(student -> {
            student.setName(updatedStudent.getName());
            student.setAge(updatedStudent.getAge());
            return studentRepository.save(student);
        })
        .orElseThrow(() -> new RuntimeException("Student not found"));
}
//DELETE student
@DeleteMapping("/delete/{id}")
public String deleteStudent(@PathVariable Long id) {
    studentRepository.deleteById(id);
    return "Student deleted successfully";
}

}