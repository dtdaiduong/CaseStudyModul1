const Food_data = "Food_data";
const lsCarts = "lsCarts";

class Food {
    constructor(id, name, images, price) {
        this.id = id;
        this.name = name;
        this.images = images;
        this.price = price;
    }
}

let foods = [];
let carts = [];

function init() {
    if (getLocalStorage(Food_data) == null) {
        foods = [
            new Food(1, " Rau ", "Images/Rau.png", "6000vnd/1g"),
            new Food(2, " Thịt ", "Images/Thit.png", "190000vnd/1Kg"),
            new Food(3, " Cá ", "Images/Ca.png", "150000vnd/1Kg"),
            new Food(4, " Sữa ", "Images/Sua.png", "40000vnd/1 chai"),
            new Food(5, " Trứng ", "Images/Trung.png", "30000vnd/12 quả"),
            new Food(6, " Mì tôm ", "Images/MiTom.png", "150000vnd/1 thùng"),
            new Food(7, " Thịt đông lạnh ", "Images/DoDongLanh.png", "180000vnd/1Kg"),
            new Food(8, " Thịt/Cá hộp ", "Images/DoHop.png", "15000vnd/1 hộp"),
            new Food(9, " Nước Mắm ", "Images/NuocMam.png", "20000vnd/1 chai"),
            new Food(10, " Xì Dầu ", "Images/XiDau.png", "15000vnd/1 chai"),
        ];
        setLocalStorage(Food_data, foods);
    }
    else {
        foods = getLocalStorage(Food_data);
    }
}

function setLocalStorage(keyword, data) {
    window.localStorage.setItem(keyword, JSON.stringify(data));
}

function getLocalStorage(keyword) {
    return JSON.parse(window.localStorage.getItem(keyword));
}

function removeLocalStorage(keyword) {
    window.localStorage.removeItem(keyword);
}

function getNewId() {
    return foods[foods.length - 1].id + 1;
}

function saveAdd() {
    let id = getNewId();
    let name = document.getElementById("name").value;
    let images = document.getElementById("images").value;
    let price = document.getElementById("price").value;
    let food = new Food(id, name, images, price);
    foods.push(food);
    setLocalStorage(Food_data, foods);
    showFood();
    clear();
}

function takeIt(id) {
    carts = JSON.parse(localStorage.getItem(lsCarts));
    let existItem = false;
    
    let newItem = {};

    foods.forEach(item => {
        if (item.id === id) {
            newItem.id = id;
            newItem.name = item.name;
            newItem.images = item.images;
            newItem.price = item.price;
            newItem.quantity = 1;
            return;
        }
    })

    if (carts != null) {
        carts.forEach(item => {
            if (item.id === newItem.id) {
                item.quantity += 1;
                existItem = true;
            }
        });

        if(!existItem) {
            carts.push(newItem);
        }
    } else {
        carts = [];
        carts.push(newItem);
    }

    localStorage.setItem(lsCarts, JSON.stringify(carts));

    console.log(carts);
}

function showFood() {
    let tbFood = document.getElementById("FoodList");
    tbFood.innerHTML = '';
    foods.forEach(function (food, index) {
        tbFood.innerHTML += `
                        <tr id='tr_${food.id}'>
                            <td class="text-center">${food.id}</td>
                            <td>${food.name}</td>
                            <td class="text-center">
                                <img class='img-sm' src='${food.images}'>
                            </td>
                            <td class="text-center">${food.price}</td>
                            <td>
                                <button class="btn btn-success" onclick="takeIt(${food.id})">Take It</button>
                                <button class="btn btn-danger" onclick="removeItems(${food.id})">Remove</button>
                            </td>
                        </tr>
        `;
    })
}

function clear() {
    document.getElementById("name").value = "";
    document.getElementById("images").value = "";
    document.getElementById("price").value = "";
}

function findIndexFood(foodId) {
    return foods.findIndex(function (food, index) {
        return food.id == foodId;
    });
}

function removeItems(foodId) {
    let foodCancel = findIndexFood(foodId);
    let confirmed = window.confirm("Are you sure to want to remove this Food?");
    if (confirmed) {
        foods.splice(foodCancel, 1);
        setLocalStorage(Food_data, foods);
        showFood();
    }
}

function ready() {
    init();
    clear();
    showFood();
}

ready();
