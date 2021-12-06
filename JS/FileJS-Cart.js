const lsCarts = "lsCarts";
        const Food_data = "Food_data";
        let carts = [];
        let foods = [];
        carts = JSON.parse(localStorage.getItem(lsCarts));
        foods = JSON.parse(localStorage.getItem(Food_data));

        let productIndex = 0;

        function setLocalStorage(keyword, data) {
            window.localStorage.setItem(keyword, JSON.stringify(data));
        }

        function getLocalStorage(keyword) {
            return JSON.parse(window.localStorage.getItem(keyword));
        }

        function showCart() {
            let str = ``;

            if (carts != null) {
                carts.forEach((item, index) => {
                    str += `
                    <tr id='tr_${item.id}'>
                            <td class="text-center">${item.id}</td>
                            <td>${item.name}</td>
                            <td class="text-center">
                                <img class='img-sm' src='${item.images}'>
                            </td>
                            <td class="text-center">${item.price}</td>
                            <td class="text-center">${item.quantity}</td>
                            <td>
                                <button class="btn btn-danger" onclick = deleteFood(${item.id})>Delete</button> 
                            </td>
                        </tr>
                    `;
                });

                document.getElementById("cart").innerHTML = str;
            }
        }

        function findIndexFood(itemId) {
            return carts.findIndex(function (item, index) {
                return item.id == itemId;
            });
        }

        function deleteFood(itemId) {
            let foodCancel = findIndexFood(itemId);
            let confirmed = window.confirm("Are you sure to want to cancel this Food?");
            if (confirmed) {
                carts.splice(foodCancel, 1);
                setLocalStorage(lsCarts, carts);
                showCart();
            }
        }

        window.onload = function () {
            showCart();
        }
