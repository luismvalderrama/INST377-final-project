
  async function mainEvent() {
    // the async keyword means we can make API requests
    const loadDataButton = document.querySelector("#data_load");
    const clearDataButton = document.querySelector("#data_clear");
    const generateListButton = document.querySelector("#generate");
    const textField = document.querySelector("#resto");
  
    const loadAnimation = document.querySelector("#data_load_animation");
    loadAnimation.style.display = "none";
    generateListButton.classList.add("hidden");

/*     const carto = initMap(); */  
    const storedData = localStorage.getItem('storedData');
    let parsedData = JSON.parse(storedData);
  
    if (parsedData?.length > 0) {
      generateListButton.classList.remove("hidden");
    }
  
    let currentList = [];
  
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    loadDataButton.addEventListener("click", async (submitEvent) => {
      // async has to be declared on every function that needs to "await" something
      console.log("Loading data");
      loadAnimation.style.display = "inline-block";
  
      const results = await fetch(
        /* /v2/search/instant */
        "https://trackapi.nutritionix.com/v2/search/instant"
      );
  
      const storedList = await results.json();
      localStorage.setItem('storedData', JSON.stringify(storedList));
      parsedData = storedList;

      if (parsedData?.length > 0) {
        generateListButton.classList.remove("hidden");
      }
  
      loadAnimation.style.display = "none";
      // console.table(storedList);
    });
  
  
  
    generateListButton.addEventListener("click", (event) => {
      console.log("generate new list");
      currentList = cutRestaurantList(parsedData);
      console.log(currentList);
      injectHTML(currentList);
      markerPlace(currentList, carto);
    });

    clearDataButton.addEventListener("click", (event) => {
      console.log('clear browser data');
      localStorage.clear();
      console.log('localStorage Check', localStorage.getItem("storedData"))
    })
  }
  
  document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
  