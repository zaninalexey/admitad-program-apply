chrome.browserAction.onClicked.addListener(function (tab) {
    if (tab && tab.url && tab.url.indexOf('admitad.com') > -1) {
        // run content script to get URL of partner programs to open in new tabs
        chrome.tabs.executeScript(tab.id, {
            file: 'getPageUrls.js'
        }, function (result) {
            toClose = []; // array of tabs that can be closed
            console.log("Links: ", result);
            if (result[0].length > 0) {
                for (j = 0; j < result[0].length; j++) {
                    chrome.tabs.create({
                        url: 'https://www.admitad.com' + result[0][j]
                    });
                }
                chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
                    if (changeInfo.status == 'complete') {
                        for (n = 0; n < toClose.length; n++) {
                            if (tab.url.indexOf(toClose[n]) != -1) {
                                toClose.splice(n, 1);
                                chrome.tabs.remove(tab.id);
                                break;
                            }
                        }
                        for (k = 0; k < result[0].length; k++) {
                            if (tab.url.indexOf(result[0][k]) != -1) {
                                chrome.tabs.executeScript(tab.id, {
                                    file: 'sendrequest.js'
                                });
                                toClose.push(result[0][k]);
                                result[0].splice(k, 1);
                                break;
                            }
                        }
                    }
                });
            }
        });
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.indexOf('https://www.admitad.com/ru/webmaster/websites/') == -1) {
        chrome.browserAction.disable(
            tabId
        )
    }
});
