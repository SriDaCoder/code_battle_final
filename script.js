let total = 0;
let cart = {};
const VAT_RATE = 0.05;
let discount = 0;
let item_price = {
    'shirt': 10,
    'belt': 5
};
let item_name = {
    'shirt': 'Shirt',
    'belt': 'Belt'
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded and event listener attached.");
    
    document.getElementById("checkoutTable").addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            var row = event.target.closest("tr");
            var item = row.cells[0].innerText;
            var price = parseFloat(row.cells[1].innerText.replace(/[^0-9.]/g, ''));
            
            if (!isNaN(price)) {
                if (!cart[item]) {
                    cart[item] = { quantity: 0, price: price };
                }
                cart[item].quantity += 1;
                total += price;
                updateCartDisplay();
            }
        }
    });
});

function addItem() {
    var inputItem = document.getElementById('itemName').value.trim().toLowerCase();
    if (item_price[inputItem] !== undefined) {
        let price = item_price[inputItem];
        let displayName = item_name[inputItem];
        
        if (!cart[displayName]) {
            cart[displayName] = { quantity: 0, price: price };
        }
        cart[displayName].quantity += 1;
        total += price;
        updateCartDisplay();
    }
    
    document.getElementById('itemName').value = '';
}

function updateCartDisplay() {
    const vatAmount = total * VAT_RATE;
    const totalWithVAT = total + vatAmount - discount;
    
    document.getElementById('totalPrice').innerText = 'Total Price: ' + total.toFixed(2) + ' AED';
    document.getElementById('vatAmount').innerText = 'VAT (5%): ' + vatAmount.toFixed(2) + ' AED';
    document.getElementById('totalWithVAT').innerText = 'Total with VAT: ' + totalWithVAT.toFixed(2) + ' AED';

    // Apply discount for every 100 in total (10% for each 100)
    if (total >= 100) {
        let newDiscount = Math.min(parseInt(total / 100) * 10, 50); // Max 50% discount
        if (newDiscount !== discount) {
            discount = newDiscount;
            document.getElementById('discount').innerText = 'Discount: ' + discount + '%';
        }
    } else {
        discount = 0;
        document.getElementById('discount').innerText = 'Discount: 0%';
    }
    
    const discountedAmount = Math.round(((total * (discount / 100))-5)/10)*10;
    document.getElementById('discountedAmount').innerText = 'Discounted Amount: ' + discountedAmount.toFixed(2) + ' AED';


    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';
    
    for (let item in cart) {
        const newItem = document.createElement('p');
        newItem.style.padding = '0px';
        newItem.innerText = item + ' x' + cart[item].quantity + ' - ' + (cart[item].quantity * cart[item].price) + ' AED';
        itemsList.appendChild(newItem);
    }
}
