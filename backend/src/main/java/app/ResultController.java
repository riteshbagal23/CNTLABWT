package app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:5173")
public class ResultController {

    @Autowired
    private StudentRepository repo;

    @PostMapping("/add")
    public StudentResult addResult(@Valid @RequestBody StudentResult result) {
        return repo.save(result);
    }

    @GetMapping("/all")
    public List<StudentResult> getAll() {
        return repo.findAll();
    }
}
