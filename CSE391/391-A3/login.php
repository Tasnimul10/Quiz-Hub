<?php
    include "config.php";
    session_start();
    if(isset($_POST['login'])){

        $username = $_POST['username'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
        $result = $conn->query($sql);

        if($result->num_rows == 1){

            $row = $result->fetch_assoc();

            $_SESSION['user_id'] = $row['id'];
            $_SESSION['role'] = $row['role'];

            if($row['role'] == "admin"){
                header("Location: admin_dashboard.php");
                exit();
            }
            else{
                header("Location: user_dashboard.php");
                exit();
            }

        }
        else{
            echo "Invalid Username or Password";
        }

    }
?>

<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<link rel="stylesheet" href="style.css">
</head>

<body>
     <img src="images/cars.jpg" 
         style="position:fixed; 
                top:0; 
                left:0; 
                width:100%; 
                height:100%; 
                object-fit:cover; 
                z-index:-1;">

    <div class="container">

        <h2 class='h2'>Login</h2>

        <form method="POST">

            <input type="text" name="username" placeholder="Username" required>

            <input type="password" name="password" placeholder="Password" required>

            <button type="submit" name="login">Login</button>

            <p class='p'><a href="register.php">Create account</a></p>

        </form>

    </div>

</body>
</html>
