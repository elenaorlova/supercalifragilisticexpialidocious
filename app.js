const dataSet = [
    {
        address: 'г.Плавск, ул.Победы,1-е',
        priority: '1',
        amount: '98794',
        type: 'Касса',
    },
    {
        address: 'г.Плавск, ул.Коммунаров,72-а',
        priority: '2',        
        amount: '98794',
        type: "Касса",
    },
    {
        address: 'г.Плавск пл.Сводобы, 2',
        priority: '2',        
        amount: '98794',
        type: "Касса",
    },
    {
        address: 'г.Калуга, ул.Литейная, 25/15',
        priority: '1',
        amount: '10099',
        type: 'Касса',
    },
    {
        address: 'г.Калуга, ул.Гагарина, 1',
        priority: '1',        
        amount: '10068',
        type: "Нужно поставить зону выдачи",
    },
    {
        address: 'г.Калуга, ул.Кибальчича, 25',
        priority: '1',        
        amount: '10100',
        type: "Касса",
    },
    {
        address: 'г.Калуга, ул.Пестеля, 60/49',
        priority: '1',        
        amount: '10099',
        type: "Постомат / Касса",
    },
    {
        address: 'г.Калуга, ул.Ленина, 81',
        priority: '1',        
        amount: '10096',
        type: "Постомат / Касса",
    },
    {
        address: 'г.Калуга, ул.Фридриха Энгельса, 78А п1',
        priority: '1',        
        amount: '10088',
        type: "Касса",
    },
    {
        address: 'г.Калуга, ул.Мичурина, 11',
        priority: '1',        
        amount: '10036',
        type: "Нужно поставить зону выдачи",
    },
    {
        address: 'г.Калуга, ул.Пушкина, 3 п 68',
        priority: '1',        
        amount: '10094',
        type: "Нужно поставить",
    },
    {
        address: 'г.Калуга, ул. Держинского, 38',
        priority: '1',        
        amount: '10053',
        type: "Нужно поставить",
    },
    {
        address: 'г.Калуга, ул.Ромодановские дворики, 59',
        priority: '2',        
        amount: '10019',
        type: "Касса (Низкий показатель по забору товара на кассе)",
    },
    {
        address: 'г.Калуга, ул.Зерновой, 15',
        priority: '3',        
        amount: '10100',
        type: "Постомат (Нужно убрать, самые низкие показатели по забору товара)",
    },
    {
        address: 'п.Дубна, ул.Льва Толстого, 1б',
        priority: '1',        
        amount: '10048',
        type: "Нужно поставить кассу",
    },
]
ymaps.ready(init);    
function init(){ 

    var myMap = new ymaps.Map("map", {
        center: [54.155974, 36.957218],
        zoom: 8
    });

    {dataSet.map(el => (
       get_coords(el.address, dataSet)
    ))}

    function get_coords(address, dataSet)
    {
        var substringArray = address.split(","); 
        var city = substringArray[0]
        ymaps.geocode(city, { rspn: 1,results: 1 }).then(function (res)
        {
            strictBounds: true
            var firstGeoObject = res.geoObjects.get(0);
            var cords1 = firstGeoObject.geometry.getCoordinates();
            
            ymaps.geocode(address, { rspn: 1, li: [cords1[0], cords1[1]], results: 1 }).then(function (res)
            {
                strictBounds: true
                var firstGeoObject = res.geoObjects.get(0);
                var cords2 = firstGeoObject.geometry.getCoordinates();
                console.log(cords1 + " " + cords2)
                //if (cords1 !== cords2){
                    const index = dataSet.map(e => e.address).indexOf(address);
                    dataSet[index].coord =cords1[0] + ", "+ cords1[1]
                    console.log(dataSet[index].priority)
                    myMap.geoObjects
                        .add(new ymaps.Placemark([Number(cords2[0]), Number(cords2[1])], {
                            balloonContent: '<strong>Адрес: </strong>' + dataSet[index].address + "<br><strong>Выручка:</strong> " + dataSet[index].amount
                        }, {
                            preset: 'islands#circleDotIcon',
                            iconColor: (dataSet[index].priority == 1) ? "green" :(dataSet[index].priority == 2) ? "yellow": "red"
                        })) 
                    //return (cords1);
                //} 
            })
        },
        function (err)
        {
        // Если геокодирование не удалось,
        // сообщаем об ошибке
            alert(err.message);
        });
    } 
    /*{dataSet.map(el => (
        myMap.geoObjects
            .add(new ymaps.Placemark(el.coord, {
                balloonContent: 'цвет <strong>детской неожиданности</strong>'
            }, {
                preset: 'islands#circleDotIcon',
                iconColor: (dataSet[index].priority === 1) ? "red" : "yellow"
            }))
    ))}*/
}