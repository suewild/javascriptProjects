const { test, expect } = require("@playwright/test");
const GroceryListPage = require("./pages/groceryList");

const GROCERIES = [
  { id: "1", name: "cheese" },
  { id: "2", name: "butter" },
  { id: "3", name: "onions" },
  // Add more items as needed
];

test.describe("grocery list with page objects", () => {
  let groceryListPage;

  test.beforeEach(async ({ page }) => {
    groceryListPage = new GroceryListPage(page);
    await groceryListPage.load();
    await groceryListPage.addTwoGroceryItemsToLocalStorage(GROCERIES);
    await groceryListPage.displayLocalStorageGroceryItemsInDOM();
    await groceryListPage.expectPageLoaded();
    await expect(groceryListPage.groceryItem).toHaveCount(2);
  });

  test("should add and display grocery item", async ({ page }) => {
    await groceryListPage.addItem(GROCERIES[2].name);
    await groceryListPage.expectAlertDisplays(
      "success",
      "item added to the list"
    );
    await expect(groceryListPage.groceryItem).toHaveCount(3);
    await expect(groceryListPage.groceryItem.nth(2)).toHaveText(
      GROCERIES[2].name
    );
    await groceryListPage.checkNumberOfGroceryItemsInLocalStorage(3);
  });

  test("should not add empty string to grocery list", async ({ page }) => {
    await groceryListPage.addItem("");
    await groceryListPage.expectAlertDisplays("danger", "please enter value");
    await expect(groceryListPage.groceryItem).toHaveCount(2);
    await groceryListPage.checkNumberOfGroceryItemsInLocalStorage(2);
  });

  test("should delete grocery item", async ({ page }) => {
    // delete item at specified index number
    await groceryListPage.deleteItem(1);
    await groceryListPage.expectAlertDisplays("danger", "item removed");
    await expect(groceryListPage.groceryItem).toHaveCount(1);
    await groceryListPage.checkNumberOfGroceryItemsInLocalStorage(1);
  });

  test("should update grocery item name", async ({ page }) => {
    // edit item at specified index number
    await groceryListPage.editItem(1);
    await expect(groceryListPage.input).toHaveValue(GROCERIES[1].name);
    await groceryListPage.deleteTextFromInput();
    // use add item to change the text of the item we're editing e.g. enter new text and submit
    await groceryListPage.addItem("cat food");
    await groceryListPage.expectAlertDisplays("success", "value changed");
    await expect(groceryListPage.groceryItem.nth(1)).toHaveText("cat food");
    await groceryListPage.checkNumberOfGroceryItemsInLocalStorage(2);
  });

  test("should clear items", async ({ page }) => {
    await groceryListPage.clearItems();
    await groceryListPage.expectAlertDisplays("danger", "empty list");
    await expect(groceryListPage.groceryItem).toHaveCount(0);
    await groceryListPage.checkNumberOfGroceryItemsInLocalStorage(0);
  });
});
