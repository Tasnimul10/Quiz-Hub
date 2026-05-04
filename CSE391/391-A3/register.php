<?php
    include "config.php";

    if(isset($_POST['register'])){

        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $address = $_POST['address'];
        $username = $_POST['username'];
        $password = $_POST['password'];

        $sql = "INSERT INTO users (name, phone, address, username, password, role)
        VALUES ('$name','$phone','$address','$username','$password','user')";

        if($conn->query($sql)){
            echo "Account created successfully! <a href='login.php'>Login</a>";
        }else{
            echo "Error: ".$conn->error;
        }

}
?>

<!DOCTYPE html>
<html>
<head>
<title>Register</title>
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

        <h2>Create Account</h2>

        <form method="POST">

            <input type="text" name="name" placeholder="Name" required>

            <input type="text" name="phone" placeholder="Phone" required>

            <input type="text" name="address" placeholder="Address" required>

            <input type="text" name="username" placeholder="Username" required>

            <input type="password" name="password" placeholder="Password" required>

            <button type="submit" name="register">Register</button>

            <p><a href="login.php">Login</a></p>

        </form>

    </div>

</body>
</html>
