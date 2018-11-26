function run () {
        console.log('start');
        var a = document.querySelectorAll("div.name > a");
        
        if (a.length == 0) return;

        var links = [];
        for (j = 0; j < a.length; j++) {
          links.push(a[j].getAttribute('href'));

        }
        return links;
}

run();