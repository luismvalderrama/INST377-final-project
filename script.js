function injectHTML(list) {
  console.log("fired injectHTML");
  console.log(list);
  const target = document.querySelector("#results_box");
  target.innerHTML = "";
  list.forEach((item) => {
  //  const str = `<li><b>Brand: </b> ${item.brand_name} <b>Food Name: </b> ${item.food_name} <b>Calories: </b> ${item.nf_calories == 0 ? "N/A" : item.nf_calories}</li>`;
  const str = `<div><button type="button" onclick="newFunc('${item.nix_item_id}')">${item.food_name}</button></div>`
    target.innerHTML += str;
  });
}

async function newFunc(temp){
  const url = "https://trackapi.nutritionix.com/v2/search/item?nix_item_id=";
  const buttonResults = document.querySelector("#button_results_box");
  buttonResults.innerHTML = "";
  const result = await fetch(url + temp, {
    headers: {
      'x-app-id': 'a70a1a77',
      'x-app-key': '85cb5f8ba0262142e4397b3393c105c4'
    }
  });
  const data = await result.json()
  const foodItem = data.foods[0];
  console.log(foodItem);
  const foodItemInject = `<p>${foodItem.food_name}</p><img src="${foodItem.photo.thumb}" height="10%" width="10%"></img>`
  buttonResults.innerHTML += foodItemInject;
  console.log("2");
}
