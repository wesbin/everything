// chrome.runtime.onInstalled.addListener(({reason, version}) => {
//   if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
//     showReadme();
//   }
// });

// chrome.action.onClicked.addListener((tab) => {
//   showReadme();
// });

chrome.tabs.onCreated.addListener(tab => please(tab));

async function please(tab) {
  if (tab.pendingUrl === 'edge://newtab/') {
    let url = chrome.runtime.getURL("index.html");
    await chrome.tabs.update(tab.id, {url})
  }
}

// function showReadme(info, tab) {
//   let url = chrome.runtime.getURL("index.html");
//   chrome.tabs.create({url});
// }
