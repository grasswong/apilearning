
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
}); 

const hiddenElements= document.querySelectorAll('.items');
hiddenElements.forEach((el)=>observer.observe(el));


async function fetchPokemon(){

    const display=document.querySelector(".pokemon");
    display.textContent="";
    const status=document.querySelector(".stats");
    status.textContent="";

    try{
    const input= document.getElementById("pokeName").value.toLowerCase();
    const result= await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    const response= await result.json();

    if(!result.ok){
        throw new Error(console.error("No such pokemon"));
    }
    console.log(response);

    const sprites=response.sprites.other["official-artwork"].front_default;
    const back_default=response.sprites.other["showdown"].back_default;
    const skill1=response.abilities[0].ability.name;
    const skill2=response.abilities[1].ability.name;

    const img1=document.createElement("img");
    const img2=document.createElement("img");
    const stat1=document.createElement("p");
    const stat2=document.createElement("p");

    img1.width=200;
    img1.height=200;
    img2.width=200;
    img2.height=200;
    img1.src=sprites;
    img2.src=back_default;
    stat1.textContent=skill1.toUpperCase();
    stat2.textContent=skill2.toUpperCase();

    display.appendChild(img1);
    display.appendChild(img2);
    status.appendChild(stat1);
    status.appendChild(stat2);
    }
    catch(error){
        console.error(error);
    }

}