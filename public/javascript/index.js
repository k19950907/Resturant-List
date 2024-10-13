const categoryCheckBox = document.querySelector(".checkboxes")
const restaurants = document.querySelector("#restaurants")

let selectedCategories = []
categoryCheckBox.addEventListener("click", (event) => {
  const target = event.target
  if (target.type === "checkbox"){
    if(target.checked){
      selectedCategories.push(target.id)
      fetch("/restaurants", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({"categories": selectedCategories})
      })
      .then(response => response.json())
      .then(data => {
        const sortedRestaurants = data.restaurants
        let rawHTML = ``
        sortedRestaurants.forEach(restaurant => {
          rawHTML += `
          <a href="/restaurants/${restaurant.id}" class="text-secondary">
            <div class="card mb-3">
              <img class="card-img-top" src="${restaurant.image}"
              alt="${restaurant.name}">
              <div class="card-body p-3">
                <h6 class="card-title mb-1">${restaurant.name}</h6>

                <div class="restaurant-category mb-1">
                  <i class="fas fa-utensils pr-2"></i> ${restaurant.category}
                </div>

                <span class="badge rounded-pill bg-danger font-weight-normal">
                  ${restaurant.rating}
                  <i class="fas fa-star fa-xs"></i>
                </span>
              </div>
            </div>
          </a>
          `
        })
        restaurants.innerHTML = rawHTML
      })
    }else{
      const category = selectedCategories.find((category) => (category === target.id))
      selectedCategories.splice(selectedCategories.indexOf(category), 1)
      fetch("/restaurants", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ "categories": selectedCategories })
      })
      .then(response => response.json())
      .then(data => {
        const sortedRestaurants = data.restaurants
        let rawHTML = ``
        sortedRestaurants.forEach(restaurant => {
          rawHTML += `
          <a href="/restaurants/${restaurant.id}" class="text-secondary">
            <div class="card mb-3">
              <img class="card-img-top" src="${restaurant.image}"
              alt="${restaurant.name}">
              <div class="card-body p-3">
                <h6 class="card-title mb-1">${restaurant.name}</h6>

                <div class="restaurant-category mb-1">
                  <i class="fas fa-utensils pr-2"></i> ${restaurant.category}
                </div>

                <span class="badge rounded-pill bg-danger font-weight-normal">
                  ${restaurant.rating}
                  <i class="fas fa-star fa-xs"></i>
                </span>
              </div>
            </div>
          </a>
          `
          
        })
        restaurants.innerHTML = rawHTML
      })
    }
  }
})