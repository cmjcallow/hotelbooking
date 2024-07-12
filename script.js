// Dummy data for London hotels
const hotels = [
  {
    id: 1,
    name: "The Ritz London",
    address: "150 Piccadilly, St. James's, London W1J 9BR",
    price: 500,
    rating: 5,
    image: "/api/placeholder/400/300?text=The+Ritz+London",
  },
  {
    id: 2,
    name: "The Savoy",
    address: "Strand, London WC2R 0EU",
    price: 450,
    rating: 5,
    image: "/api/placeholder/400/300?text=The+Savoy",
  },
  {
    id: 3,
    name: "Claridge's",
    address: "Brook Street, Mayfair, London W1K 4HR",
    price: 550,
    rating: 5,
    image: "/api/placeholder/400/300?text=Claridge's",
  },
  {
    id: 4,
    name: "The Dorchester",
    address: "53 Park Lane, Mayfair, London W1K 1QA",
    price: 600,
    rating: 5,
    image: "/api/placeholder/400/300?text=The+Dorchester",
  },
  {
    id: 5,
    name: "Shangri-La The Shard",
    address: "31 St Thomas Street, London SE1 9QU",
    price: 480,
    rating: 5,
    image: "/api/placeholder/400/300?text=Shangri-La+The+Shard",
  },
  {
    id: 6,
    name: "The Langham",
    address: "1C Portland Place, Regent Street, London W1B 1JA",
    price: 420,
    rating: 5,
    image: "/api/placeholder/400/300?text=The+Langham",
  },
  {
    id: 7,
    name: "Mandarin Oriental Hyde Park",
    address: "66 Knightsbridge, London SW1X 7LA",
    price: 570,
    rating: 5,
    image: "/api/placeholder/400/300?text=Mandarin+Oriental+Hyde+Park",
  },
  {
    id: 8,
    name: "The Connaught",
    address: "Carlos Place, Mayfair, London W1K 2AL",
    price: 530,
    rating: 5,
    image: "/api/placeholder/400/300?text=The+Connaught",
  },
];
// Function to search for hotels
function searchHotels() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchInput) ||
      hotel.address.toLowerCase().includes(searchInput)
  );
  localStorage.setItem("searchResults", JSON.stringify(filteredHotels));
  window.location.href = "search-results.html";
}

// Function to display search results
function showSearchResults() {
  const filteredHotels = JSON.parse(localStorage.getItem("searchResults"));
  const hotelList = document.getElementById("hotel-list");
  hotelList.innerHTML = filteredHotels
    .map(
      (hotel) => `
        <div class="hotel-card" onclick="showHotelDetails(${hotel.id})">
            <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
            <h3>${hotel.name}</h3>
            <p>${hotel.address}</p>
            <p>Starting from $${hotel.price} per night</p>
            <p>Rating: ${"★".repeat(hotel.rating)}</p>
        </div>
    `
    )
    .join("");
}

// Function to show hotel details and booking options
function showHotelDetails(hotelId) {
  const hotel = hotels.find((h) => h.id === hotelId);
  localStorage.setItem("selectedHotel", JSON.stringify(hotel));
  window.location.href = "hotel-details.html";
}

// Update the displayHotelDetails function to include images and ratings
function displayHotelDetails() {
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  const hotelDetails = document.getElementById("hotel-details");
  hotelDetails.innerHTML = `
        <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
        <h2>${hotel.name}</h2>
        <p>${hotel.address}</p>
        <p>Rating: ${"★".repeat(hotel.rating)}</p>
        <h3>Book Your Stay</h3>
        <form onsubmit="showRoomOptions(event)">
            <input type="date" id="start-date" required>
            <input type="date" id="end-date" required>
            <input type="number" id="guests" min="1" max="4" required placeholder="Number of guests">
            <button type="submit">Check Availability</button>
        </form>
    `;
}

// Function to show room options
function showRoomOptions(event) {
  event.preventDefault();
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const guests = document.getElementById("guests").value;
  localStorage.setItem(
    "bookingDetails",
    JSON.stringify({ startDate, endDate, guests })
  );
  window.location.href = "room-options.html";
}

// Function to display room options
function displayRoomOptions() {
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  const roomOptions = document.getElementById("room-options");
  roomOptions.innerHTML = `
        <h2>${hotel.name}</h2>
        <h3>Available Rooms</h3>
        <div class="room-option" onclick="showBookingForm('Standard', ${
          hotel.price
        })">
            <h4>Standard Room</h4>
            <p>$${hotel.price} per night</p>
        </div>
        <div class="room-option" onclick="showBookingForm('Deluxe', ${
          hotel.price * 1.5
        })">
            <h4>Deluxe Room</h4>
            <p>$${hotel.price * 1.5} per night</p>
        </div>
        <div class="room-option" onclick="showBookingForm('Suite', ${
          hotel.price * 2
        })">
            <h4>Suite</h4>
            <p>$${hotel.price * 2} per night</p>
        </div>
    `;
}

// Function to show the booking form
function showBookingForm(roomType, price) {
  localStorage.setItem("selectedRoom", JSON.stringify({ roomType, price }));
  window.location.href = "booking-form.html";
}

// Function to display the booking form
function displayBookingForm() {
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  const room = JSON.parse(localStorage.getItem("selectedRoom"));
  const bookingForm = document.getElementById("booking-form");
  bookingForm.innerHTML = `
        <h2>Complete Your Booking</h2>
        <h3>${hotel.name} - ${room.roomType}</h3>
        <p>$${room.price} per night</p>
        <form onsubmit="submitBooking(event)">
            <input type="text" id="full-name" placeholder="Full Name" required>
            <input type="email" id="email" placeholder="Email" required>
            <input type="tel" id="phone" placeholder="Phone Number" required>
            <button type="submit">Book Now</button>
        </form>
    `;
}

// Function to submit the booking and show confirmation
function submitBooking(event) {
  event.preventDefault();
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  const room = JSON.parse(localStorage.getItem("selectedRoom"));
  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  // Generate a random transaction ID
  const transactionId = Math.random().toString(36).substr(2, 9);

  // Calculate the total nights and booking value
  const startDate = new Date(bookingDetails.startDate);
  const endDate = new Date(bookingDetails.endDate);
  const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const bookingValue = room.price * nights;

  // Store booking information for the confirmation page
  localStorage.setItem(
    "bookingConfirmation",
    JSON.stringify({
      transactionId,
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomType: room.roomType,
      price: room.price,
      startDate: bookingDetails.startDate,
      endDate: bookingDetails.endDate,
      nights,
      bookingValue,
      guests: bookingDetails.guests,
      fullName,
      email,
      phone,
    })
  );

  window.location.href = "confirmation.html";
}

// Function to display the booking confirmation
function displayConfirmation() {
  const booking = JSON.parse(localStorage.getItem("bookingConfirmation"));
  console.log("Booking data:", booking); // Log the booking data

  const confirmation = document.getElementById("confirmation");
  confirmation.innerHTML = `
        <h2>Booking Confirmed!</h2>
        <p>Thank you for your booking, ${booking.fullName}.</p>
        <p>Booking Details:</p>
        <ul>
            <li>Hotel: ${booking.hotelName}</li>
            <li>Room Type: ${booking.roomType}</li>
            <li>Check-in: ${booking.startDate}</li>
            <li>Check-out: ${booking.endDate}</li>
            <li>Guests: ${booking.guests}</li>
            <li>Total Cost: $${booking.bookingValue}</li>
        </ul>
        <p>A confirmation email has been sent to ${booking.email}.</p>
        <p>Your booking reference number is: ${booking.transactionId}</p>
    `;

  // Prepare the data for GA4
  const gaEventData = {
    event: "purchase",
    ecommerce: {
      transaction_id: booking.transactionId,
      value: booking.bookingValue,
      currency: "USD",
      tax: booking.bookingValue * 0.1, // Assuming 10% tax
      items: [
        {
          item_id: booking.hotelId,
          item_name: booking.hotelName,
          item_category: "Hotel Room",
          item_variant: booking.roomType,
          price: booking.price,
          quantity: booking.nights,
        },
      ],
    },
    booking_details: {
      customer_name: booking.fullName,
      customer_email: booking.email,
      customer_phone: booking.phone,
      check_in_date: booking.startDate,
      check_out_date: booking.endDate,
      number_of_guests: booking.guests,
      number_of_nights: booking.nights,
    },
  };

  console.log("Pushing to dataLayer:", gaEventData); // Log the data being pushed

  // Push the event to the dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object
  window.dataLayer.push(gaEventData);
}
// Initialize pages based on the current URL
function initializePage() {
  const currentPage = window.location.pathname.split("/").pop();
  switch (currentPage) {
    case "search-results.html":
      showSearchResults();
      break;
    case "hotel-details.html":
      displayHotelDetails();
      break;
    case "room-options.html":
      displayRoomOptions();
      break;
    case "booking-form.html":
      displayBookingForm();
      break;
    case "confirmation.html":
      displayConfirmation();
      break;
  }
}

// Call initializePage when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializePage);
