<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);
?>
<!DOCTYPE <html>
<html>
    <head>
<title>Login - Student Management System</title>
<link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="container">
        <h2>Login Test</h2>
        <form method="post" action="login_process.php">
            <input type="text" placeholder="Username" name="username" required>
            <input type="password" placeholder="Password" name="password" required>
            <button type="submit">Login</button>
</form>
</div>
</body>
</html>