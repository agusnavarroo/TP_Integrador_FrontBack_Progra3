const loginForm = document.getElementById("login-form");
    const btnDemo = document.getElementById("btn-demo");

    btnDemo.addEventListener("click", () => {
        document.getElementById("emailUser").value = "admin@fertin.com";
        document.getElementById("passwordUser").value = "admin123";

        loginForm.submit();
    });