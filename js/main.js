$(document).ready(function () {
  // select elements
  let finalResponse = [];
  let user = {};
  let inputSearchByName = document.getElementById("searchName");
  let inputSearchByLetter = document.getElementById("searchLetter");
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let telInput = document.getElementById("tel");
  let ageInput = document.getElementById("age");
  let passInput = document.getElementById("pass");
  let pass2Input = document.getElementById("pass2");
  let submitBtn = document.getElementById("submit");

  //loading
  $(".loading").fadeOut(1000, function () {
    $(".loading").removeClass("d-flex");
    $("body").css("overflow", "visible");
  });

  //nav sidebar
  $(".open").click(function () {
    $(".open").hide(500, function () {
      $(".close").show(500);
      $(".top-nav").show(500, function () {
        $(".first-ul li:nth-child(1)").slideDown(200, function () {
          $(".first-ul li:nth-child(2)").slideDown(200, function () {
            $(".first-ul li:nth-child(3)").slideDown(200, function () {
              $(".first-ul li:nth-child(4)").slideDown(200, function () {
                $(".first-ul li:nth-child(5)").slideDown(200);
              });
            });
          });
        });
      });
    });
  });
  $(".close").click(function () {
    $(".close").hide(500, function () {
      $(".open").show(500);
      $(".top-nav").hide(500, function () {
        $(".first-ul li:nth-child(1)").slideUp(200, function () {
          $(".first-ul li:nth-child(2)").slideUp(200, function () {
            $(".first-ul li:nth-child(3)").slideUp(200, function () {
              $(".first-ul li:nth-child(4)").slideUp(200, function () {
                $(".first-ul li:nth-child(5)").slideUp(200, function () {});
              });
            });
          });
        });
      });
    });
  });

  // fetch api for home
  async function getHomeData() {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    let finalResp = await response.json();
    return finalResp.meals;
  }

  // display meals in home 
  function displayMeals(meals) {
    let htmlContent = "";
    for (let i = 0; i < meals.length; i++) {
      htmlContent += ` <div class="col-md-3">
          <div class="inner position-relative overflow-hidden rounded-3">
            <div>
              <img src="${meals[i].strMealThumb}" class="w-100 " alt="meal">
              <div class="overlay bg-white bg-opacity-75 position-absolute start-0 end-0 top-0 bottom-0 rounded-3 d-flex align-items-center ps-2">
                <span class="fw-semibold fs-2">${meals[i].strMeal}</span>
              </div>
            </div>
          </div>
        </div>`;
    }
    document.getElementById("home").innerHTML = htmlContent;
  }
  async function runHomeData() {
    let mealsData = await getHomeData();
    displayMeals(mealsData);
  }
  runHomeData();

  // fetch api for categories
  async function getCategoriesData() {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let finalResponse = await response.json();
    return finalResponse.categories;
  }

  // display categories
  function displayCategoriesData(category) {
    let htmlContent = "";
    for (let i = 0; i < category.length; i++) {
      htmlContent += ` <div class="col-md-3">
          <div class="inner position-relative overflow-hidden rounded-3">
            <div>
              <img src="${
                category[i].strCategoryThumb
              }" class="w-100 " alt="meal">
              <div class="overlay bg-white bg-opacity-75 position-absolute start-0 end-0 top-0 bottom-0 rounded-3 text-center p-2">
                <span class="fw-bold fs-3
                ">${category[i].strCategory}</span>
                 <p class="fs-6">${category[i].strCategoryDescription
                   .split(" ")
                   .slice(0, 20)
                   .join(" ")}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    document.getElementById("category").innerHTML = htmlContent;
  }

  // run categories
  async function runCategoriesData() {
    let categoriesData = await getCategoriesData();
    displayCategoriesData(categoriesData);
  }

  $("#navigate2").click(function () {
    $(".close").hide(500, function () {
      $(".open").show(500);
      $(".top-nav").hide(500);
    });
    $("#theHome").fadeOut(0);
    $("#categories").fadeIn(0);
    $("#areas").fadeOut(0);
    $("#ingredients").fadeOut(0);
    $("#theSearch").fadeOut(0);
    $("#contactUs").fadeOut(0);

    runCategoriesData();
  });

  // fetch api for area
  async function getAreaData() {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let finalResponse = await response.json();
    return finalResponse.meals;
  }

  // display area
  function displayAreaData(area) {
    let htmlContent = "";
    for (let i = 0; i < area.length; i++) {
      htmlContent += `  <div class="col-md-3">
              <div class="inner">
                <div class="text-white text-center">
                  <div><i class="fa-solid fa-house-laptop fa-5x"></i></div>
                  <p class="fs-3 fw-semibold">${area[i].strArea}</p>
                </div>
              </div>
            </div>`;
    }
    document.getElementById("area").innerHTML = htmlContent;
  }

  // run area
  async function runAreaData() {
    let areaData = await getAreaData();
    displayAreaData(areaData);
  }

  $("#navigate3").click(function () {
    $(".close").hide(500, function () {
      $(".open").show(500);
      $(".top-nav").hide(500);
    });
    $("#theHome").fadeOut(0);
    $("#categories").fadeOut(0);
    $("#areas").fadeIn(0);
    $("#ingredients").fadeOut(0);
    $("#theSearch").fadeOut(0);
    $("#contactUs").fadeOut(0);

    runAreaData();
  });

  // fetch api for ingredients
  async function getIngredientsData() {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let finalResponse = await response.json();
    return finalResponse.meals.slice(0, 20);
  }

  // display ingredients
  function displayIngredientsData(ingredient) {
    let htmlContent = "";
    for (let i = 0; i < ingredient.length; i++) {
      htmlContent += `
     <div class="col-md-3">
            <div class="inner">
              <div class="text-white text-center">
                <div><i class="fa-solid fa-drumstick-bite fa-4x"></i></div>
                <h3 class="fs-3 fw-semibold">${ingredient[i].strIngredient}</h3>
                <p>${ingredient[i].strDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
              </div>
            </div>
          </div>`;
    }
    document.getElementById("ingredient").innerHTML = htmlContent;
  }

  // run ingredients
  async function runIngredientsData() {
    let ingredientsData = await getIngredientsData();
    displayIngredientsData(ingredientsData);
  }

  $("#navigate4").click(function () {
    $(".close").hide(500, function () {
      $(".open").show(500);
      $(".top-nav").hide(500);
    });
    $("#theHome").fadeOut(0);
    $("#categories").fadeOut(0);
    $("#areas").fadeOut(0);
    $("#ingredients").fadeIn(0);
    $("theSearch").fadeOut(0);
    $("#contactUs").fadeOut(0);
    runIngredientsData();
  });

  // fetch api for serch by name
  inputSearchByName.addEventListener("input", function () {
    let res = inputSearchByName.value;
    getSearchName(res);
  });
  async function getSearchName(term) {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    finalResponse = await response.json();
    if(finalResponse.meals != null){
      displaySearchedData(finalResponse.meals);
    }else{
      displaySearchedData("");
    }
  }

  // display search data by name
  function displaySearchedData(data) {
    let htmlContent = "";
    for (let i = 0; i < data.length; i++) {
      htmlContent += ` <div class="col-md-3">
      <div class="inner position-relative overflow-hidden rounded-3">
        <div>
          <img src="${data[i].strMealThumb}" class="w-100 " alt="meal">
          <div class="overlay bg-white bg-opacity-75 position-absolute start-0 end-0 top-0 bottom-0 rounded-3 d-flex align-items-center ps-2">
            <span class="fw-semibold fs-2">${data[i].strMeal}</span>
          </div>
        </div>
      </div>
    </div>`;
    }
    document.getElementById("search").innerHTML = htmlContent;
  }


  $("#navigate1").click(function () {
    $(".close").hide(500, function () {
      $(".open").show(500);
      $(".top-nav").hide(500);
    });
    $("#theSearch > .row").removeClass("d-none");
    $("#theHome").fadeOut(0);
    $("#categories").fadeOut(0);
    $("#areas").fadeOut(0);
    $("#ingredients").fadeOut(0);
    $("#theSearch").fadeIn(0);
    $("#contactUs").fadeOut(0);
  });

  // fetch api for search by first letter
  inputSearchByLetter.addEventListener("input", function () {
    let res = inputSearchByLetter.value;
    getSearchLetter(res);
  });
  async function getSearchLetter(term) {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
    );

    finalResponse = await response.json();
    if(finalResponse.meals != null){
      displaySearchedDataFL(finalResponse.meals);
    }else{
      displaySearchedDataFL("");
    }
   
  }

  //display data for serched by first letter
  function displaySearchedDataFL(data) {
    let htmlContent = "";
    for (let i = 0; i < data.length; i++) {
      htmlContent += ` <div class="col-md-3">
      <div class="inner position-relative overflow-hidden rounded-3">
        <div>
          <img src="${data[i].strMealThumb}" class="w-100 " alt="meal">
          <div class="overlay bg-white bg-opacity-75 position-absolute start-0 end-0 top-0 bottom-0 rounded-3 d-flex align-items-center ps-2">
            <span class="fw-semibold fs-2">${data[i].strMeal}</span>
          </div>
        </div>
      </div>
    </div>`;
    }
    document.getElementById("search").innerHTML = htmlContent;
  }

  // contact us
  $("#navigate5").click(function () {
    $(".close").hide(500, function () {
      $(".open").show(500);
      $(".top-nav").hide(500);
    });
    $("#theSearch > .row").removeClass("d-none");
    $("#theHome").fadeOut(0);
    $("#categories").fadeOut(0);
    $("#areas").fadeOut(0);
    $("#ingredients").fadeOut(0);
    $("#theSearch").fadeOut(0);
    $("#contactUs").removeClass("d-none");
  });

  // event
  $("#contactUs input").on("input", function () {
    getUserData();
    checkData();
  });

  //get user data
  function getUserData() {
    user = {
      name: nameInput.value,
      email: emailInput.value,
      tel: telInput.value,
      age: ageInput.value,
      password: passInput.value,
      repassword: pass2Input.value,
    };
  }

  // check
  function checkData() {
    if (
      validateName() == true &&
      validateEmail() == true &&
      validatePhone() == true &&
      validateAge() == true &&
      validatePassword() == true &&
      validateRepassword() == true
    ) {
      $("#submit").removeClass("disabled");
    }
  }

  // validateName();
  function validateName() {
    let nameRegex = /^[a-zA-Z]{2,15}$/;
    if (nameRegex.test(nameInput.value) == true) {
      $(".nameAlert").addClass("d-none");
      return true;
    } else {
      $(".nameAlert").removeClass("d-none");
      return false;
    }
  }

  // validate email
  function validateEmail() {
    let emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (emailRegex.test(emailInput.value) == true) {
      $(".emailAlert").addClass("d-none");
      return true;
    } else {
      $(".emailAlert").removeClass("d-none");
      return false;
    }
  }

  //validate tel
  function validatePhone() {
    let phoneRegex = /^(010|011|012|015)\d{8}$/;
    if (phoneRegex.test(telInput.value) == true) {
      $(".telAlert").addClass("d-none");
      return true;
    } else {
      $(".telAlert").removeClass("d-none");
      return false;
    }
  }

  // validate age
  function validateAge() {
    let ageRegex = /^(1[2-9]|[2-9][0-9]|100)$/;
    if (ageRegex.test(ageInput.value) == true) {
      $(".ageAlert").addClass("d-none");
      return true;
    } else {
      $(".ageAlert").removeClass("d-none");
      return false;
    }
  }

  //validate password
  function validatePassword() {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(passInput.value) == true) {
      $(".passAlert").addClass("d-none");
      return true;
    } else {
      $(".passAlert").removeClass("d-none");
      return false;
    }
  }

  // validate repassword
  function validateRepassword() {
    if (pass2Input.value == passInput.value) {
      $(".pass2Alert").addClass("d-none");
      return true;
    } else {
      $(".pass2Alert").removeClass("d-none");
      return false;
    }
  }
});
