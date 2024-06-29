/* Formats the inventory and appends it to the INVENTORY section */
function inventoryHTML(name, amount){
    // Gotta be careful with these... 
    return `<div class="inv-item"><span class="inv-item-name">${name.toUpperCase().replace(/[^\w]+/g, "")} - </span><span class="inv-item-amount">${(typeof amount === "number") ? amount : 0}</span></div>`;
}

export default function renderInventory(data) {
    let newHTML = "";
    data.inventory.forEach((item) => {
        newHTML += inventoryHTML(item[0], item[1]);
    });
    $("#inv-contents").append(newHTML);
}
