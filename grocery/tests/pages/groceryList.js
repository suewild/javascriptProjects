// Import necessary modules from Playwright
const { expect } = require("@playwright/test");

class GroceryListPage {
  constructor(page) {
    this.page = page; // Assign the passed 'Page' instance to 'this.page'
    this.input = page.getByTestId("grocery-input");
    this.submitBtn = page.getByTestId("submit-btn");
    this.groceryContainer = page.getByTestId("grocery-container");
    this.groceryList = page.getByTestId("grocery-list");
    this.groceryItem = page.locator(".grocery-item");
    this.groceryItemTitle = page.getByTestId("grocery-item-title");
    this.deleteBtn = page.getByTestId("delete-btn");
    this.editBtn = page.getByTestId("edit-btn");
    this.clearItemsBtn = page.getByTestId("clear-btn");
  }

  // goes to specified url
  async load() {
    await this.page.goto("http://127.0.0.1:5500/index.html");
  }

  // check pages displays
  async expectPageLoaded() {
    await expect(this.input).toBeVisible();
  }

  // add item to grocery list
  async addItem(name) {
    await this.input.fill(name);
    await this.submitBtn.click();
    await expect(this.groceryContainer).toHaveClass(
      "grocery-container show-container"
    );
  }

  // clear all items
  async clearItems() {
    await this.clearItemsBtn.click();
  }

  // check alert displays
  async expectAlertDisplays(expectedClass, message) {
    const alert = this.page.locator(`.alert-${expectedClass}`);
    await expect(alert).toBeVisible();
    await expect(alert).toHaveText(message);
    await expect(alert).not.toBeVisible();
  }

  // delete grocery item
  async deleteItem(itemIndex) {
    const item = this.groceryItem.nth(itemIndex);
    await item.locator(".delete-btn").click();
  }

  // clear text from input
  async deleteTextFromInput() {
    await this.input.click({ clickCount: 3 }); // Triple click to select all text
    await this.input.press("Backspace"); // Press backspace to delete
  }

  // edit grocery item
  async editItem(itemIndex) {
    const item = this.groceryItem.nth(itemIndex);
    await item.locator(".edit-btn").click();
  }

  // add 2 items to local storage
  async addTwoGroceryItemsToLocalStorage(items) {
    await this.page.evaluate((localItems) => {
      // Slice the array to include only the first two items
      const firstTwoItems = localItems.slice(0, 2);
      localStorage.setItem("list", JSON.stringify(firstTwoItems));
    }, items); // Passing `items` as an argument to `page.evaluate`
  }

  // retrieve items in local storage and display in DOM
  async displayLocalStorageGroceryItemsInDOM() {
    await this.page.evaluate(() => {
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

  async checkNumberOfGroceryItemsInLocalStorage(expected) {
    try {
      await this.page.waitForFunction((expectedCount) => {
        const list = localStorage.getItem("list");
        return list
          ? JSON.parse(list).length === expectedCount
          : expectedCount === 0;
      }, expected);
    } catch (error) {
      // customised error with a more descriptive message
      throw new Error(
        `Timeout waiting for the number of items in local storage to be ${expected}`
      );
    }
  }
}

module.exports = GroceryListPage;
