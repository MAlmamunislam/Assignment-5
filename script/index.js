const login = () =>
  document.getElementById("login-btn").addEventListener("click", function () {
    const userName = document.getElementById("username");
    const userNameValue = userName.value;
    const password = document.getElementById("password");
    const passwordValue = password.value;
   if(userNameValue === 'admin' ){
     console.log('ok user name ok')
   }
   else{
     alert('Please enter a valid username ');
     return
   }
   if(passwordValue === 'admin123'){
      alert('login successes')
     window.location.assign('./home.html')

   }
   else{
     alert('Please enter the correct password')
   }
  });
