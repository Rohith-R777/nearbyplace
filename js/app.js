(function () {
  "use strict";

  // ===== DOM references =====
  var searchInput = document.getElementById("search-input");
  var searchBtn = document.getElementById("search-btn");
  var locateBtn = document.getElementById("locate-btn");
  var placesGrid = document.getElementById("places-grid");
  var noResults = document.getElementById("no-results");
  var locationInfo = document.getElementById("location-info");
  var locationText = document.getElementById("location-text");
  var categoryBtns = document.querySelectorAll(".category-btn");

  // ===== State =====
  var activeCategory = "all";
  var userLat = null;
  var userLng = null;

  // ===== Helpers =====

  /**
   * Calculate the distance between two coordinates using the Haversine formula.
   * Returns distance in kilometres.
   */
  function haversineDistance(lat1, lng1, lat2, lng2) {
    var R = 6371; // Earth radius in km
    var dLat = toRad(lat2 - lat1);
    var dLng = toRad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function toRad(deg) {
    return (deg * Math.PI) / 180;
  }

  /**
   * Render stars from a numeric rating (e.g. 4.5 → "⭐⭐⭐⭐½").
   */
  function renderStars(rating) {
    var full = Math.floor(rating);
    var half = rating - full >= 0.5 ? 1 : 0;
    var stars = "";
    for (var i = 0; i < full; i++) stars += "⭐";
    if (half) stars += "½";
    return stars + " " + rating.toFixed(1);
  }

  // ===== Rendering =====

  function renderPlaces(places) {
    placesGrid.innerHTML = "";

    if (places.length === 0) {
      noResults.classList.remove("hidden");
      return;
    }

    noResults.classList.add("hidden");

    places.forEach(function (place) {
      var card = document.createElement("div");
      card.className = "place-card";

      var distanceHTML = "";
      if (userLat !== null && userLng !== null) {
        var dist = haversineDistance(userLat, userLng, place.lat, place.lng);
        distanceHTML =
          '<p class="distance">📏 ' + dist.toFixed(1) + " km away</p>";
      }

      card.innerHTML =
        '<div class="card-image bg-' +
        place.category +
        '">' +
        '<span>' + place.icon + '</span>' +
        "</div>" +
        '<div class="card-body">' +
        '<span class="category-tag tag-' +
        place.category +
        '">' +
        place.category +
        "</span>" +
        "<h3>" +
        escapeHTML(place.name) +
        "</h3>" +
        '<p class="description">' +
        escapeHTML(place.description) +
        "</p>" +
        '<p class="rating">' +
        renderStars(place.rating) +
        "</p>" +
        distanceHTML +
        "</div>";

      placesGrid.appendChild(card);
    });
  }

  /**
   * Escape HTML entities to prevent XSS when rendering user-influenced text.
   */
  function escapeHTML(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ===== Filtering =====

  function getFilteredPlaces() {
    var query = searchInput.value.trim().toLowerCase();

    var filtered = PLACES_DATA.filter(function (place) {
      var matchesCategory =
        activeCategory === "all" || place.category === activeCategory;
      var matchesSearch =
        query === "" ||
        place.name.toLowerCase().indexOf(query) !== -1 ||
        place.description.toLowerCase().indexOf(query) !== -1 ||
        place.category.toLowerCase().indexOf(query) !== -1;
      return matchesCategory && matchesSearch;
    });

    // Sort by distance if location is available
    if (userLat !== null && userLng !== null) {
      filtered.sort(function (a, b) {
        var distA = haversineDistance(userLat, userLng, a.lat, a.lng);
        var distB = haversineDistance(userLat, userLng, b.lat, b.lng);
        return distA - distB;
      });
    }

    return filtered;
  }

  function applyFilters() {
    renderPlaces(getFilteredPlaces());
  }

  // ===== Geolocation =====

  function getUserLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    locateBtn.textContent = "⏳";
    navigator.geolocation.getCurrentPosition(
      function (position) {
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;
        locationText.textContent =
          userLat.toFixed(4) + ", " + userLng.toFixed(4);
        locationInfo.classList.remove("hidden");
        locateBtn.textContent = "📍";
        applyFilters();
      },
      function () {
        alert(
          "Unable to retrieve your location. Please allow location access and try again."
        );
        locateBtn.textContent = "📍";
      }
    );
  }

  // ===== Event Listeners =====

  searchBtn.addEventListener("click", applyFilters);

  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      applyFilters();
    }
  });

  locateBtn.addEventListener("click", getUserLocation);

  categoryBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      categoryBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");
      applyFilters();
    });
  });

  // ===== Initial Render =====
  applyFilters();
})();
