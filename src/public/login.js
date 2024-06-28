
//const mensajeError = document.getFlementsByName("error") [0]
const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit",async(e)=>{
    e.preventDefault();
    // console.log(e.target.children.user.value)
    const user = e.target.children.user.value;
    const password = e.target.children.password.value;

    //http://localhost:3000
    const res = await fetch("/api/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            user,password

        })
    });

    if(!res.ok) return mensajeError.classList.toggle("escondido", false);
    const resJson = await res.json();


    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }

})





















//*** MArca de tiempo 10000*/
//*** Marca de tiempo 20000*/
//*** Marca de tiempo 30000*/
//*** Marca de tiempo 40000*/
//*** Marca de tiempo 50000*/