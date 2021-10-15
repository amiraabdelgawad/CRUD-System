let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let addUpdateButton = document.getElementById("add-update");
let PNameAlert = document.getElementById("PNameAlert");
let PCategoryAlert = document.getElementById("PCategoryAlert");
let PPriceAlert = document.getElementById("PPriceAlert");
let PDescriptionAlert = document.getElementById("PDescriptionAlert");

let productContainer;
let updatedIndex;

// check if local storage is empty or not
if(localStorage.getItem("productList")== null)
{
    productContainer =[];
}
else{
    productContainer =JSON.parse(localStorage.getItem("productList"));
    displayProduct();
}

//check and call add & update function
addUpdateButton.onclick = function(){
    if(addUpdateButton.innerHTML == 'Add Product'){
        addProduct();
    }
    else{
        editProduct(updatedIndex);
        addUpdateButton.innerHTML = "Add Product";
    }

    displayProduct();
    clearForm();
}

//add function
function addProduct() {
    
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value
    }
    productContainer.push(product)
    localStorage.setItem("productList",JSON.stringify(productContainer));
}


//display function
function displayProduct() {
    var cartona = "";
    for (var i = 0; i < productContainer.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].desc}</td>
        <td>
            <button class="btn btn-warning" onclick="updateProduct(${i})"> 
                Update
            </button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteProduct(${i})"> 
                Delete
            </button>
        </td>
    </tr>
`;
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

//delete function
function deleteProduct(index) {
    productContainer.splice(index, 1)
    localStorage.setItem("productList",JSON.stringify(productContainer));
    displayProduct()
}

//seach function
function search(term){
    var cartona = "";
    for(var i=0;i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
                        cartona += `<tr>
                    <td>${i + 1}</td>
                    <td>${productContainer[i].name}</td>
                    <td>${productContainer[i].category}</td>
                    <td>${productContainer[i].price}</td>
                    <td>${productContainer[i].desc}</td>
                    <td>
                        <button class="btn btn-warning"> 
                            Update
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteProduct(${i})"> 
                            Delete  
                        </button>
                    </td>
                </tr>
            `;
        }
        
        document.getElementById("tableBody").innerHTML = cartona;
    }
}

//update functions
function updateProduct(index){
    addUpdateButton.innerHTML = "Update Product";
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDesc.value = productContainer[index].desc;

    updatedIndex = index ;
    
}

function editProduct (){
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value
    }
    productContainer[updatedIndex].name = product.name ;
    productContainer[updatedIndex].category = product.category ;
    productContainer[updatedIndex].price = product.price ;
    productContainer[updatedIndex].desc = product.desc ;

    localStorage.setItem("productList",JSON.stringify(productContainer));

}

//clear function
function clearForm() {
    productName.value = "",
    productPrice.value = "",
    productCategory.value = "",
    productDesc.value = ""

    productName.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productDesc.classList.remove("is-valid");
}


/********************** validation **********************/
function productNameValidation(){
    let regex = /^[A-Z][a-z A-z 0-9]{2,}$/;
    if(regex.test(productName.value)){
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");

        PNameAlert.classList.add("d-none");
        PNameAlert.classList.remove("d-block");

        addUpdateButton.disabled = false;
        return true;
    }
    else{

        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");

        PNameAlert.classList.add("d-block");
        PNameAlert.classList.remove("d-none");

        addUpdateButton.disabled = true;
        return false;
    }
}

function checkDuplicatedNames(){
    for(let i=0;i<productContainer.length;i++){
        if(productName.value == productContainer[i].name){
            productName.classList.add("is-invalid");
            productName.classList.remove("is-valid");

            PNameAlert.classList.add("d-block");
            PNameAlert.classList.remove("d-none");

            PNameAlert.innerHTML = "Product Name Already Exists";
            addUpdateButton.disabled = true;
        }
    }
}

function productCategoryValidation(){
    var regex = /^[a-z A-Z 0-9]{5,}$/;

    if (regex.test(productCategory.value) == true) {

        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");

        PCategoryAlert.classList.add("d-none");
        PCategoryAlert.classList.remove("d-block");

        addUpdateButton.disabled = false;

        return true;

    } else {
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");

        PCategoryAlert.classList.add("d-block");
        PCategoryAlert.classList.remove("d-none");

        addUpdateButton.disabled = true;

        return false;
    }
}

function productPriceValidation() {

    var regex = /^([1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|10000)$/;

    if (regex.test(productPrice.value) == true) {

        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");

        PPriceAlert.classList.add("d-none");
        PPriceAlert.classList.remove("d-block");

        addUpdateButton.disabled = false;

        return true;

    } else {
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");

        PPriceAlert.classList.add("d-block");
        PPriceAlert.classList.remove("d-none");

        addUpdateButton.disabled = true;

        return false;
    }
}

function productDescValidation(){
    var regex = /^[a-z A-Z 0-9]{3,}$/;
    if (regex.test(productDesc.value) == true) {
    productDesc.classList.add("is-valid");
    productDesc.classList.remove("is-invalid");

    PDescriptionAlert.classList.add("d-none");
    PDescriptionAlert.classList.remove("d-block");

    addUpdateButton.disabled = false;

    return true;
    } else {
    productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");

    PDescriptionAlert.classList.add("d-block");
    PDescriptionAlert.classList.remove("d-none");

    addUpdateButton.disabled = true;

    return false;
    }
}

productName.addEventListener("keyup", productNameValidation);
productCategory.addEventListener("keyup", productCategoryValidation);
productPrice.addEventListener("keyup", productPriceValidation);
productDesc.addEventListener("keyup", productDescValidation);
productName.addEventListener("blur", checkDuplicatedNames);