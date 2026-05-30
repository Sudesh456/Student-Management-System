const API_URL = "http://localhost:8080/students";
//Show message function
            function showMessage(text, color) {
                const message = document.getElementById("message");
                message.innerText = text;
                message.style.color = color;
                setTimeout (()=> {
                    message.innerText = "";
                }, 3000);
            }
            //Add student
            function addStudent() {
                const name = document.getElementById("name").value.trim();
                const age = document.getElementById("age").value;

                //Validation
                if(name === "" || age === "") {
                    showMessage("Please fill all the fields!", "red");
                    return;
                }
                if(age <= 0) {
                    showMessage("Invalid age!", "red");
                    return;
                }

                fetch(`${API_URL}/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name: name, age: age })
                })
                .then(response => response.json())
                .then(() => {
                    showMessage("Student added Successfully!", "green");
                    loadStudent();

                    //Clear input fields
                    document.getElementById("name").value = "";
                     document.getElementById("age").value = "";
                    })
                    .catch(error => {
                        console.log(error);
                        showMessage("Error adding student!", "red")
                    });
            }

            //Load all students
            function loadStudent() {
                fetch(`${API_URL}/all`)
                .then(response => response.json())
                .then(data => {
                    const table = document.getElementById("studentTable");
                    table.innerHTML = "";

                    //Empty state
                    if (data.length === 0) {
                        table.innerHTML = `
                        <tr>
                        <td colspan="4">No students found</td>
                        </tr>
                        `;
                        return;
                    }
                    data.forEach(s => {
                        table.innerHTML += `
                        <tr>
                            <td>${s.id}</td>
                            <td>${s.name}</td>
                            <td>${s.age}</td>
                            <td>
                            <button onclick="editStudent(${s.id}, '${s.name}', ${s.age})">Edit</button>
                            <button onclick="deleteStudent(${s.id})">Delete</button>
                            </td>
                            </tr>
                            `;
                    });
                })
                .catch(error => {
                    console.log(error);
                    showMessage("Error loading students!", "red");
                });
            }

            //Delete student
            function deleteStudent(id) {
                const confirmDelete = confirm("Are you sure you want to delete this student?");

                if(!confirmDelete) {
                    return;
                }
                fetch(`${API_URL}/delete/${id}`, {
                    method: "DELETE"
                })
                
                .then(() => {
                    showMessage("Student Deleted Successfully!", "red");
                    loadStudent();
                })
                .catch(error => {
                    console.log(error);
                    showMessage("Error deleting student!", "red");
                });
            }

                //Edit student
                        function editStudent(id, name, age) {
                const newName = prompt("Enter new name", name);
                const newAge = prompt("Enter new age", age);

                //validation
                if (newName === null || newAge === null) {
                    return;
                }
                if(newName.trim() === "" || newAge.trim() === "") {
                    showMessage("Fields cannot be empty!", "red");
                    return;
                }
                if (newAge <= 0) {
                    showMessage("Invalid age!", "red");
                    return;
                }
                if (newAge <= 0) {
                    showMessage("Invalid age!", "red");
                    return;
                }
                fetch(`${API_URL}/update/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: newName,
                        age: newAge
                    })
                })
                .then(() => {
                    showMessage("Student Updated Successfully!", "green");
                    loadStudent();
                })
                .catch(error => {
                    console.log(error);
                    showMessage("Error updating student!", "red");
                });
            }

            //Search student
            function searchStudent() {
                const input = document.getElementById("search").value.toLowerCase();
                const rows = document.querySelectorAll("#studentTable tr");
                rows.forEach(row => {
                    const name = row.children[1]?.innerText.toLowerCase();
                    if(name && name.includes(input)) {
                        row.style.display = "";
                    } else {
                        row.style.display = "none";
                    }
                });
            }
            //Load students when page opens
            window.onload = loadStudent;