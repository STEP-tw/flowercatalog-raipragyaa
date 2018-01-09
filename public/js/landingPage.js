let hideJar = function(){
  let jar = document.getElementById('jar');
  jar.style.visibility = 'hidden';
  setTimeout(makeJarVisible,500);
}

let makeJarVisible = function(){
  let jar = document.getElementById('jar');
  jar.style.visibility = 'visible';
}
