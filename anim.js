function intervertir(){
    img1 = document.getElementById("img1");
    img2 = document.getElementById("img2");
    temp = img1.src;
    img1.src = img2.src;
    img2.src = temp;
}