<?php
$conn = mysqli_connect("localhost","root","","student_system");
if (!$conn) {
    die("connection failed: " . mysqli_connect_error());
}
?>