<?php
include '../config/db.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Dashboard</title>
        <link rel="stylesheet" href="../style.css">
</head>
<body>
    <h1>Student Management Dashboard</h1>
    <h2>Add Student</h2>
    <form method="POST">
        Name: <input type="text" name="name"><br><br>
        Email: <input type="email" name="email"><br><br>
        Course: <input type="text" name="course"><br><br>
        <input type="submit" name="submit" value="Add Student">
</form>
<?php
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $course = $_POST['course'];

    $sql = "INSERT INTO students (name, email, course) VALUES ('$name' , '$email', '$course' )";
    mysqli_query($conn, $sql);
    echo "<p>Student Added Successfully!</p>";
    }
    ?>
    </body>
    </html>
    <h2>Student List</h2>
    <table border="1">
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Course</th>
    <th>Action</th>
</tr>
<?php
$result = mysqli_query($conn, "SELECT *FROM students");
while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>
    <td>{$row['id']}</td>
    <td>{$row['name']}</td>
    <td>{$row['email']}</td>
    <td>{$row['course']}</td>
    <td><a href='?delete_id={$row['id']}'>Delete</a></td>
    </tr>";
}
?>
</table>
<?php
if (isset($_GET['delete_id'])) {
    $id = $_GET['delete_id'];
    mysqli_query($conn, "DELETE FROM students WHERE id=$id");
    echo "<p>Student Deleted!</p>";
}
?>
