import { browser } from "webextension-polyfill-ts";

browser.commands.onCommand.addListener(async (command) => {
  const tabs = (await browser.tabs.query({ currentWindow: true })).sort(
    (a, b) => a.index - b.index
  );
  const activeTab = tabs.find((tab) => tab.active);

  const nextIndex =
    tabs.slice(-1)[0].index === activeTab.index ? 0 : activeTab.index + 1;
  browser.tabs.update(tabs[nextIndex].id, { active: true });

  const index = command.includes("move-end") ? -1 : 0;
  browser.tabs.move(activeTab.id, { index });
});
