window.onload = function() {
if (window.localStorage.timeFrame == undefined) {
    window.localStorage.timeFrame = 'weeky';
}
    document.querySelector('button[name = "'+ window.localStorage.timeFrame +'"]').className = 'active';
    let xhtthp = new XMLHttpRequest();
    xhtthp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let allData = JSON.parse(this.responseText);
            let main = document.querySelector('main');
            let div = document.createElement('div');
            let h2 = document.createElement('h2');
            let h3 = document.createElement('h3');
            let p = document.createElement('p');

            allData.forEach(function(data) {
                let calcType;
                if (window.localStorage.timeFrame === 'daily') {
                    calcType = data.timeframes.daily;
                } else if (window.localStorage.timeFrame === 'monthly') {
                    calcType = data.timeframes.monthly;
                } else if (window.localStorage.timeFrame === 'weekly') {
                    calcType = data.timeframes.weekly;
                }
                main.appendChild(div.cloneNode()).className = 'item ' + data.title.replace(/\s+/g, '-').toLowerCase();
                let item = main.querySelector('.' + data.title.replace(/\s+/g, '-').toLowerCase());
                item.appendChild(div.cloneNode()).className = 'item-container';
                let itemContainer = item.querySelector('div.item-container');
                itemContainer.appendChild(div.cloneNode()).className = 'title-container';
                itemContainer.appendChild(div.cloneNode()).className = 'item-details';
                
                let titleContainer = itemContainer.querySelector('div.title-container');
                titleContainer.appendChild(h3.cloneNode()).className = 'title';
                let itemDetails = itemContainer.querySelector('div.item-details');
                itemDetails.appendChild(h2.cloneNode()).className = 'hours h1';
                itemDetails.appendChild(p.cloneNode());

                titleContainer.appendChild(div.cloneNode()).innerHTML = 
                '<svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">\
                <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" \
                fill="#BBC0FF" fill-rule="evenodd"/>';
                titleContainer.querySelector('h3.title').textContent = data.title;
                
                itemDetails.querySelector('h2.hours').textContent = calcType.current + 'hrs';

                itemDetails.querySelector('p').textContent = 'Last ' + window.localStorage.timeFrame + ' - ' + calcType.previous + 'hrs';
            })
        }
    };
    xhtthp.open("GET", "data.json");
    xhtthp.send();
}
function change () {
    let xhtthp = new XMLHttpRequest();
    xhtthp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let allData = JSON.parse(this.responseText);

            allData.forEach(function(data) {
                if (document.querySelectorAll('.item') !== null) {
                    let calcType;
                    if (window.localStorage.timeFrame === 'daily') {
                        calcType = data.timeframes.daily;
                    } else if (window.localStorage.timeFrame === 'monthly') {
                        calcType = data.timeframes.monthly;
                    } else if (window.localStorage.timeFrame === 'weekly') {
                        calcType = data.timeframes.weekly;
                    }
                    let selectedItem = document.querySelector('.item.'+ data.title.replace(/\s+/g, '-').toLowerCase());
                    selectedItem.querySelector('h2').textContent = calcType.current + 'hrs';
                    selectedItem.querySelector('p').textContent = 'Last ' + window.localStorage.timeFrame + ' - ' + calcType.previous + 'hrs';
                }
            })
        }
    };
    xhtthp.open("GET", "data.json");
    xhtthp.send();
}
let buttons = document.querySelector('.calc-tools').querySelectorAll('button');

    buttons.forEach(function (button) {
        button.addEventListener("click", function(){
            buttons.forEach(function (button) { if (button.classList.contains('active')){ button.removeAttribute('class'); } });
            window.localStorage.timeFrame = button.name;
            button.classList.add('active');
            change();
        })
    });
