import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "boxicons/css/boxicons.min.css";
import "./styles.css";

/*=============== SHOW MENU ===============*/
const navMenu = document.querySelector("#nav-menu");
const navToggle = document.querySelector("#nav-toggle");
const header = document.querySelector("#header");

navToggle.addEventListener("click", () => {
  navMenu.classList.add("show-nav-menu");
  document.documentElement.classList.add("hidden-scroll");
});

/*=============== HIDE MENU ===============*/
function closeNav(event) {
  navMenu.classList.remove("show-nav-menu");
  document.documentElement.classList.remove("hidden-scroll");
}

const menuElements = document.querySelectorAll(".nav__list a, .nav__close");
menuElements.forEach((element) => element.addEventListener("click", closeNav));

/*=============== MENU ACTIVE LINK ===============*/
const sectionIds = ["home", "products", "premium", "blog"];
let sections = [];
sectionIds.forEach((id) => sections.push(document.querySelector(`#${id}`)));

function test() {
  for (const section of sections) {
    const top = section.getBoundingClientRect().top;
    const bottom = section.getBoundingClientRect().bottom;
    const activeLink = document.querySelector(".active-link");
    const sectionClass = document.querySelector(
      `.nav__list a[href*="${section.id}"]`,
    );
    if (top < 50 && bottom > section.offsetHeight * 0.2) {
      sectionClass.classList.add("active-link");
      break;
    } else if (activeLink) {
      sectionClass.classList.remove("active-link");
    }
  }
}

window.addEventListener("scroll", test);

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  // When the scroll is greater than 50px viewport height, add the
  // scroll-header class to the header tag
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);

/*=============== PRODUCT FILTERING ===============*/
const DELICACIES_STRING = "delicacies";
const COFFEE_STRING = "coffee";
const CAKES_STRING = "cakes";
const FILTER_REGEX = `${DELICACIES_STRING}|${COFFEE_STRING}|${CAKES_STRING}`;
const PRODUCTS_CONTENT_CLASS = "products__content";

const delicacies = document.querySelectorAll(
  `.${PRODUCTS_CONTENT_CLASS} .${DELICACIES_STRING}`,
);
const coffee = document.querySelectorAll(
  `.${PRODUCTS_CONTENT_CLASS} .${COFFEE_STRING}`,
);
const cakes = document.querySelectorAll(
  `.${PRODUCTS_CONTENT_CLASS} .${CAKES_STRING}`,
);

function filter() {
  hideProducts(delicacies);
  hideProducts(coffee);
  hideProducts(cakes);

  showProducts(getFilterProducts(this));
}

function hideProducts(products) {
  products.forEach((product) => (product.style.display = "none"));
}

function showProducts(products) {
  products.forEach((product) => (product.style.display = "block"));
}

function getFilterProducts(filter) {
  const filterClass = filter.className.match(FILTER_REGEX)[0];
  let filterProducts;
  if (filterClass === DELICACIES_STRING) {
    filterProducts = delicacies;
  } else if (filterClass === COFFEE_STRING) {
    filterProducts = coffee;
  } else {
    filterProducts = cakes;
  }
  return filterProducts;
}

hideProducts(coffee);
hideProducts(cakes);

const filterDelicacies = document.querySelector(
  `.products__filters > .${DELICACIES_STRING}`,
);
const filterCoffee = document.querySelector(
  `.products__filters > .${COFFEE_STRING}`,
);
const filterCakes = document.querySelector(
  `.products__filters > .${CAKES_STRING}`,
);

filterDelicacies.addEventListener("click", filter);
filterCoffee.addEventListener("click", filter);
filterCakes.addEventListener("click", filter);

/* Link active products */
const productsItems = document.querySelectorAll(".products__item");
/* Default active products item*/
productsItems[0].classList.add("active-products");

function linkActiveProducts() {
  const activeProducts = document.querySelector(".active-products");
  if (activeProducts !== this) {
    activeProducts.classList.remove("active-products");
    this.classList.add("active-products");
  }
}

productsItems.forEach((item) =>
  item.addEventListener("click", linkActiveProducts),
);

/*=============== SCROLL UP ===============*/
const scrollup = document.querySelector("#scrollup");

function toggleScrollup() {
  if (window.scrollY > 350) {
    scrollup.classList.add("show-scrollup");
  } else {
    scrollup.classList.remove("show-scrollup");
  }
}

window.addEventListener("scroll", toggleScrollup);
