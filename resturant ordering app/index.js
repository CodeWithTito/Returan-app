import menuArray from './data.js'
const menuSection = document.querySelector(".menu-section")
const orderSection = document.getElementById("order-section")
const checkoutSection = document.getElementById("checkout-section")
const formSection = document.querySelector(".form-section")
const chekoutList = document.querySelector(".chekout-list")

const listFromRenderMenu = []




document.addEventListener("click", function(e){
    if (e.target.dataset.menuId){
        const menuId = e.target.dataset.menuId
        const menuItem = menuArray.find((element) => element.id === Number(menuId))
       
        listFromRenderMenu.push({
            price: menuItem.price, 
            names: menuItem.names
            
        })
       
        renderOrderList(listFromRenderMenu)
        
    }
    if (e.target.dataset.action === "completeOrder") {
        formSection.style.display = "block";
    }

    if (e.target.dataset.action === "pay"){
        formSection.style.display = "none";
    }
    
    if (e.target.dataset.action === "remove"){
        const id = e.target.dataset.menuId;
        const index = listFromRenderMenu.findIndex((element) => element.id === Number(id));
        listFromRenderMenu.splice(index, 1);
        renderOrderList(listFromRenderMenu);
    }
    


})



function renderMenu(){
    const htmlArr = menuArray.map(menuArr =>{
        const {
            names,
            ingredients,
            id,
            price,
            emoji
        }= menuArr

        return `
        <div class="menu-products data-menu-id=${id}">
        <p class="menu-img" >${emoji}</p>
        <div class="menu-content">            
            <h2 class="menu-names">${names}</h2>
            <p class="menu-ingredients">${ingredients}</p>
            <h3 class="menu-price">$${price}</h3>
        </div>      
        <button data-menu-id="${id}" class="menu-buttun" >+</button>        
    </div>   
   

        ` 
    })

    menuSection.innerHTML =htmlArr.join("")
    
}

renderMenu()

function renderOrderList(){
    const htmlArr = listFromRenderMenu.map(list =>{
        const{
            names,
            price
        }=list

        return `
    <div class="chekout-list">
        <div class="chekout-list-left">
            <h2 class="checkout-name">${names}</h2>
            <button data-action="remove" class="rm-btn">remove</button>
        </div>
        <div class="chekout-list-right">
            <h3 class="checkout-price">${price}$</h3>
        </div>
    </div>
  
            
        `

    })

    const totalSum = totalPrice(listFromRenderMenu)
    
    
    
   
   
    const checkoutList = `

    <div class="checkout-lists" ${totalSum === 0 ? 'style="display: none;"' : ''}>
            <h2 class="cheackout-titel">Your order</h2>
            ${htmlArr.join("")}

            <div class="total-price-section">
                <h2 class="total-price">Total price</h2>
                <h3 class="total-price-chekout">${totalSum}$</h3>
            </div>
        </div>
        <div class="checkout-btm-section">
        <button ${totalSum === 0 ? 'style="display: none;"' : ''} data-action="completeOrder" class="purches-btn">Complete order</button>
        </div>

 
 
        `
        checkoutSection.innerHTML = checkoutList
}

function totalPrice(order){
    return order.reduce((total, {price}) => total + price, 0)

    
}



