import { test, expect } from "@playwright/test";

test("player gravity table has Stephen Curry in first row", async ({
  page,
}) => {
  await page.goto("https://www.nba.com/inside-the-game/player/gravity");

  const table = page.locator("table");
  await expect(table).toBeVisible();

  const firstHeader = table.locator("thead tr:last-child th:first-child");
  await expect(firstHeader).toHaveText("PLAYER");

  const firstRow = table.locator("tbody tr").first();
  await expect(firstRow).toBeVisible();

  const firstRowPlayer = firstRow.locator("td:first-child");
  const firstRowPlayerName = firstRowPlayer.locator("div:nth-child(2)");
  await expect(firstRowPlayerName).toHaveText("Stephen Curry");
});
