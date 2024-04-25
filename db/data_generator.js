const { faker } = require("@faker-js/faker");
const fs = require("fs");

const NUM_PRODUCTS = 1000;
const NUM_ORDERS = 1000;
const NUM_STAFF = 5;
const NUM_CATEGORIES = 10;

function generateProduct(i, categories) {
  const imageUrl = `https://picsum.photos/200/300?random=${Math.floor(
    Math.random() * NUM_PRODUCTS
  )}`;
  return {
    id: i,
    name: faker.commerce.productName(),
    price: faker.commerce.price({ min: 10, max: 100, dec: 2 }),
    imageUrl,
    category_id: faker.helpers.arrayElement(categories).id,
  };
}

function generateOrder(products) {
  const staffId = faker.number.int(NUM_STAFF);
  const date = faker.date.past({ years: 1 });

  const selectedProducts = faker.helpers.arrayElements(
    products,
    Math.min(products.length, 3)
  );

  const orderItems = selectedProducts.map((product) => ({
    product_id: product.id,
    quantity: faker.number.int({ min: 1, max: 5 }),
  }));

  return {
    staff_id: staffId,
    date: date,
    orderItems,
  };
}

function generateStaff(i) {
  return {
    id: i,
    name: faker.internet.userName(),
  };
}

function generateCategory(i) {
  return {
    id: i,
    name: faker.commerce.department(),
  };
}

async function main() {
  const categories = [];
  for (let i = 0; i < NUM_CATEGORIES; i++) {
    categories.push(generateCategory(i));
  }
  const products = [];
  for (let i = 0; i < NUM_PRODUCTS; i++) {
    products.push(generateProduct(i, categories));
  }

  const orders = [];
  for (let i = 0; i < NUM_ORDERS; i++) {
    orders.push(generateOrder(products));
  }

  const staff = [];
  for (let i = 0; i < NUM_STAFF; i++) {
    staff.push(generateStaff(i));
  }

  console.log("Generated Data:");
  console.log("Products:", products);
  console.log("Orders:", orders);
  console.log("Staff:", staff);
  console.log("Categories:", categories);

  fs.writeFileSync("productsData.json", JSON.stringify(products, null, 2));
  fs.writeFileSync("ordersData.json", JSON.stringify(orders, null, 2));
  fs.writeFileSync("staffData.json", JSON.stringify(staff, null, 2));
  fs.writeFileSync("categoriesData.json", JSON.stringify(categories, null, 2));

  console.log("Generated data saved to data.json");
}

main();
