var mainContainer = document.getElementsByClassName("main")[0];
var userContainer = document.getElementById("user");
var searchContainer = document.getElementsByClassName("search")[0];
var input = searchContainer.querySelector("input");
var buttonSearch = searchContainer.querySelector("button");
var xhttp = getXmlHttp();
var userhttp = getXmlHttp();


buttonSearch.addEventListener("click", function(){
	mainContainer.innerHTML = ""; 
	userContainer.innerHTML = "";
	var id = input.value;
	var urlUserInfo = `https://jsonplaceholder.typicode.com/users?id=${id}`;
	var urlPostInfo = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;
	console.log(id);
 loadInfo(xhttp,getUserInfo,urlUserInfo); 
 loadInfo(userhttp,getData,urlPostInfo); 
})



//запрос на получение данных
function loadInfo(xmlHttpRequest,funct,href) {
	
	xmlHttpRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			funct(this);	
		}
	};
  xmlHttpRequest.open("GET", href, true);
  xmlHttpRequest.send();
}



//Вывод постов пользователя
function getData(data){
	 
	var ulContainer = document.createElement("ul");
	var allData = JSON.parse(data.responseText);
	
	if(allData.length!=0){
	allData.forEach(function(element,index){
		var liElement = document.createElement("li");
		
		var numberPost = document.createElement("div");
		numberPost.classList.add("decor-number-post")
		numberPost.innerText = `Post №${element["id"]}`;
		
		var titlePost = document.createElement("h1");
		titlePost.innerText = bigFirstLetter(element["title"]);
	    
		var bodyPost = document.createElement("div");
		bodyPost.classList.add("decor-body-post")
		bodyPost.innerText = element["body"];
		
		var hr = document.createElement("hr");
		mainContainer.appendChild(ulContainer);
		ulContainer.append(liElement);
		liElement.appendChild(numberPost);
		liElement.appendChild(titlePost);
		liElement.appendChild(bodyPost);
		liElement.appendChild(hr);
	    })
	  }else{
		var noPost = document.createElement("li");
		noPost.style.textAlign = "center";
		noPost.style.border = 0;
		noPost.innerHTML = "Нет постов";
		mainContainer.appendChild(ulContainer);
		ulContainer.appendChild(noPost);
	}
	
	
}

	
	
 //Установка объекта для соединения с сервером в зависимости от браузера
function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

//Меняем первую букву на заглавную
function bigFirstLetter(str){
	return str[0].toUpperCase() + str.slice(1);
}
//Выводи инфу о пользователе
function getUserInfo(data){
	
	var allData = JSON.parse(data.responseText);
	
	if(allData.length!=0){
		console.log(allData);
	var nameContainer = document.createElement("p");
	nameContainer.innerHTML =`<b>Имя пользователя: </b> ${allData[0]["name"]}`;
	
	var surnameContainer = document.createElement("p");
	surnameContainer.innerHTML  = ` <b>Фамилия пользователя: </b>${allData[0]["username"]}`;
	
	var emailContainer = document.createElement("p");
	emailContainer.innerHTML  = ` <b>email: </b>${allData[0]["email"]}`;
	
	var addresContainer = document.createElement("p");
	addresContainer.innerHTML  = `<b>Город: </b> ${allData[0]["address"]["city"]}`;
	
	var phoneContainer = document.createElement("p");
	phoneContainer.innerHTML  = `<b>Телефон: </b> ${allData[0]["phone"]}`;
	
	var siteContainer = document.createElement("p");
	siteContainer.innerHTML  = `<b>Сайт: </b> ${allData[0]["website"]}`;
	
	userContainer.appendChild(nameContainer);
	userContainer.appendChild(surnameContainer);
	userContainer.appendChild(emailContainer);
	userContainer.appendChild(addresContainer);
	userContainer.appendChild(phoneContainer);
	userContainer.appendChild(siteContainer);
	
	} else{
		var noUserContainer = document.createElement("p");
		noUserContainer.innerHTML  = '<b>Нет пользователя с таким id </b>';
		console.log(noUserContainer.innerHTML)
		userContainer.appendChild(noUserContainer);
	}
}