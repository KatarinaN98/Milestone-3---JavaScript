// Product data array
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 20,
    description: "A timeless piece for your wardrobe. Made from 100% cotton.",
    image: "images/t-shirt.webp",
    category: "clothing"
  },
  {
    id: 2,
    name: "Samsung 55\" UHD TV",
    price: 700,
    description: "Stunning 4K Ultra HD display for an immersive viewing experience.",
    image: "images/tv.webp",
    category: "electronics"
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: 45,
    description: "A stylish denim jacket for all seasons.",
    image: "images/jacket.webp",
    category: "clothing"
  },
  {
    id: 4,
    name: "Sony WH-1000XM4 Headphones",
    price: 350,
    description: "Industry-leading noise cancellation for immersive sound.",
    image: "images/headphones.webp",
    category: "electronics"
  },
  {
    id: 5,
    name: "Flip Phone Galaxy",
    price: 999,
    description: "5G speed and the fastest chip in a smartphone.",
    image: "images/phone.webp",
    category: "electronics"
  },
  {
    id: 6,
    name: "White Dress",
    price: 35,
    description: "Perfect for a casual look with comfort.",
    image: "images/dress.webp",
    category: "clothing"
  }
];

// Cart data structure
let cartItems = [];

// Function to generate product elements based on category
function generateProductElements(category) {
  const productContainer = document.querySelector(".products--list");
  productContainer.innerHTML = ""; // Clear the container for re-rendering

  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  filteredProducts.forEach((product) => {
    const productElement = document.createElement("li");
    productElement.classList.add("product", "card");

    productElement.innerHTML = `
      <img class="product--image" src="${product.image}" alt="${product.name}" />
      <h1 class="product--name">${product.name}</h1>
      <p class="product--description">${product.description}</p>
      <p class="product--price">$${product.price.toFixed(2)}</p>
      <button class="product--buy">Add to Cart</button>
    `;

    // Add event listener for "Add to Cart" button
    productElement.querySelector(".product--buy").addEventListener("click", () => {
      addToCart(product);
    });

    productContainer.appendChild(productElement);
  });
}

// Function to add a product to the cart
function addToCart(product) {
  cartItems.push(product); // Add product to cart
  displayConfirmation(product.name); // Show confirmation message
  updateCartDisplay(); // Update the cart display
}

// Function to update the cart display in the modal
function updateCartDisplay() {
  const cartDisplay = document.querySelector(".cart-items");

  if (cartItems.length === 0) {
    cartDisplay.textContent = "Your cart is empty.";
  } else {
    cartDisplay.innerHTML =
      "<ul>" +
      cartItems
        .map((item) => `<li>${item.name} - $${item.price.toFixed(2)}</li>`)
        .join("") +
      "</ul>";
  }

  // Update checkout summary
  updateCheckoutSummary();
}

// Function to display confirmation message
function displayConfirmation(productName) {
  const confirmation = document.createElement("div");
  confirmation.className = "confirmation-message";
  confirmation.textContent = `${productName} has been added to the cart.`;
  document.body.appendChild(confirmation);

  setTimeout(() => {
    confirmation.remove();
  }, 3000);
}

// Function to calculate and update checkout summary
function updateCheckoutSummary() {
  const subtotalElement = document.querySelector(".subtotal");
  const totalElement = document.querySelector(".total-price");
  const deliveryFeeElement = document.querySelector(".delivery-fee");

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = 0.00; // Fixed delivery fee (can be changed)
  const vatRate = 0.25; // VAT rate of 25%

  // Calculate total with VAT included
  const total = subtotal + deliveryFee + subtotal * vatRate;

  // Update the checkout summary elements with USD format
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  deliveryFeeElement.textContent = `$${deliveryFee.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Sorting function
function sortProducts(criteria) {
  if (criteria === "price-asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (criteria === "price-desc") {
    products.sort((a, b) => b.price - a.price);
  } else if (criteria === "name-asc") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else if (criteria === "name-desc") {
    products.sort((a, b) => b.name.localeCompare(a.name));
  }
}

// Event listener for sorting dropdown
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname;
  let category = null;

  if (page.includes("clothing")) {
    category = "clothing";
  } else if (page.includes("electronics")) {
    category = "electronics";
  }

  generateProductElements(category);

  // Sorting functionality
  const sortDropdown = document.getElementById("sort");
  sortDropdown.addEventListener("change", () => {
    const selectedOption = sortDropdown.value;
    sortProducts(selectedOption); // Sort the products array
    generateProductElements(category); // Re-render the sorted products
  });

  // Cart modal toggle
  const modal = document.getElementById("modalCart");
  const cartLink = document.getElementById("cartLink");
  const closeBtn = document.querySelector(".modal-cart-close");
  const checkoutButton = document.getElementById("checkoutButton");

  // Open cart modal
  cartLink.onclick = function () {
    modal.style.display = "block";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
    updateCartDisplay();
  };

  // Close cart modal
  closeBtn.onclick = function () {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  };

  // Close cart modal if clicked outside
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  };

  // Handle checkout button click
  checkoutButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Please add some items to proceed with checkout.");
    } else {
      // Simulate checkout process (could be replaced with actual functionality)
      alert("Proceeding to checkout...");
      // Optionally clear the cart after checkout
      cartItems = [];
      updateCartDisplay();
    }
  });
});
