// @ts-check
const { test, expect } = require("@playwright/test");

const GROCERIES = [
  { id: "1", name: "cheese" },
  { id: "2", name: "butter" },
  { id: "3", name: "onions" },
  // Add more items as needed
];

test.beforeEach(async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/index.html");
  await addTwoGroceryItemsToLocalStorage(page, GROCERIES);
  await displayLocalStorageGroceryItemsInDOM(page);
});

test.describe("grocery list", () => {
  test("should add and display grocery item", async ({ page }) => {
    // create input locator
    const input = page.getByTestId("grocery-input");
    // create grocery item.
    await input.fill(GROCERIES[2].name);
    await input.press("Enter");

    // check it displasys
    const groceryItems = page.locator(".grocery-item");
    const groceryItemsTitles = groceryItems.getByTestId("grocery-item-title");
    await expect(groceryItemsTitles.nth(2)).toHaveText(GROCERIES[2].name);

    // check alert displays temporarily
    await expect(page.locator(".alert-success")).toBeVisible();
    await expect(page.locator(".alert-success")).toHaveText(
      "item added to the list"
    );
    await expect(page.locator(".alert-success")).not.toBeVisible();

    // check number of items in local storage
    await checkNumberOfGroceryItemsInLocalStorage(page, 3);
  });

  test("should not add empty string to grocery list", async ({ page }) => {
    // create a new input locator
    const input = page.getByTestId("grocery-input");

    // create grocery item with empty string
    await input.fill("");
    await input.press("Enter");

    // displays unsuccessful alert
    await expect(page.locator(".alert-danger")).toBeVisible();
    await expect(page.locator(".alert-danger")).toHaveText(
      "please enter value"
    );
    await expect(page.locator(".alert-danger")).not.toBeVisible();

    // check number of items in local storage
    await checkNumberOfGroceryItemsInLocalStorage(page, 2);
  });

  test("should delete grocery item", async ({ page }) => {
    //  check 2 grocery items display
    await expect(page.locator(".grocery-item")).toHaveCount(2);

    // get second grocery item
    const secondGroceryItem = page.locator(".grocery-item").nth(1);

    // click delete button on second grocery item
    await secondGroceryItem.locator(".delete-btn").click();

    // displays item removed alert
    await expect(page.locator(".alert-danger")).toBeVisible();
    await expect(page.locator(".alert-danger")).toHaveText("item removed");
    await expect(page.locator(".alert-danger")).not.toBeVisible();

    // check 1 grocery item displays
    await expect(page.locator(".grocery-item")).toHaveCount(1);

    // check items in local storage have been updated
    await checkNumberOfGroceryItemsInLocalStorage(page, 1);
  });

  test("should update grocery item name", async ({ page }) => {
    //  check 2 grocery items display
    await expect(page.locator(".grocery-item")).toHaveCount(2);

    // get second grocery item
    const secondGroceryItem = page.locator(".grocery-item").nth(1);

    // get text from second grocery item
    const nameOfSecondGroceryItem = secondGroceryItem.textContent;

    // click edit button on second grocery item
    await secondGroceryItem.locator(".edit-btn").click();

    // check second grocery name populates input
    await expect(page.getByTestId("grocery-input")).toHaveValue(
      GROCERIES[1].name
    );

    // delete text and enter new text
    const input = page.getByTestId("grocery-input");
    await input.click({ clickCount: 3 }); // Triple click to select all text
    await input.press("Backspace"); // Press backspace to delete
    await input.fill("cat food"); // Enter new string
    await page.getByTestId("submit-btn").click();

    // check for value changed alert
    await expect(page.locator(".alert-success")).toBeVisible();
    await expect(page.locator(".alert-success")).toHaveText("value changed");
    await expect(page.locator(".alert-success")).not.toBeVisible();

    // check text in edited item
    expect(secondGroceryItem).toHaveText("cat food");

    // check local storage items
    await checkNumberOfGroceryItemsInLocalStorage(page, 2);
  });

  test("should clear items", async ({ page }) => {
    //  check 2 grocery items display
    await expect(page.locator(".grocery-item")).toHaveCount(2);

    await expect(page.getByTestId("clear-btn")).toBeVisible();
    await page.getByTestId("clear-btn").click();

    // check for empty list alert
    await expect(page.locator(".alert-danger")).toBeVisible();
    await expect(page.locator(".alert-danger")).toHaveText("empty list");
    await expect(page.locator(".alert-danger")).not.toBeVisible();

    // check for no items in grocery list
    await expect(page.locator(".grocery-item")).toHaveCount(0);

    // check local storage has been updated
    await checkNumberOfGroceryItemsInLocalStorage(page, 0);
  });
});

/**
 * @param {import('@playwright/test').Page} page
 * @param {number} expected
 */
async function checkNumberOfGroceryItemsInLocalStorage(page, expected) {
  try {
    await page.waitForFunction((expectedCount) => {
      const list = localStorage.getItem("list");
      return list
        ? JSON.parse(list).length === expectedCount
        : expectedCount === 0;
    }, expected);
  } catch (error) {
    // customise erro with a more descriptive message
    throw new Error(
      `Timeout waiting for the number of items in local storage to be ${expected}`
    );
  }
}

async function addGroceryItemsToLocalStorage(page, items) {
  await page.evaluate((localItems) => {
    localStorage.setItem("list", JSON.stringify(localItems));
  }, items); // Passing `items` as an argument to `page.evaluate`
}

async function addTwoGroceryItemsToLocalStorage(page, items) {
  await page.evaluate((localItems) => {
    // Slice the array to include only the first two items
    const firstTwoItems = localItems.slice(0, 2);
    localStorage.setItem("list", JSON.stringify(firstTwoItems));
  }, items); // Passing `items` as an argument to `page.evaluate`
}

async function displayLocalStorageGroceryItemsInDOM(page) {
  await page.evaluate(() => {
    // Retrieve items from localStorage and parse them
    const storedItems = getLocalStorage();

    // Check if items are retrieved and not null
    if (storedItems && Array.isArray(storedItems)) {
      storedItems.forEach((itemData) => {
        window.createListItem(itemData.id, itemData.name);
      });
    }

    window.displayGroceryContainer();
  });
}
