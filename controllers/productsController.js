const path = require("path");
const fs = require('fs');


const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productsController = {

products:(req,res) => {res.render("products", { products })},

cart: (req,res) => {res.render("cart")},

productsByBrand:(req,res) =>

{  
  
  let productBrand = req.params.marca

   let productsByBrand = products.filter((p) => p.marca == productBrand );

  res.render("productsByBrand",{ productsByBrand })

} ,

altaProducto: (req,res) => {res.render("altaProducto")},

store: (req, res) => {
    let id = products[products.length - 1].id + 1;

let images = req.files ; 

console.log(images);

let imagecolor1 = images[0].filename;
let imagecolor2 = images[1].filename;
let imagecolor3 = images[2].filename ;  

    let newProduct = {
       id,
       ...req.body,
       imagecolor1,
       imagecolor2,
       imagecolor3,
     };
     console.log(newProduct);
    
     products.push(newProduct);
     fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");
 
     res.redirect("/");
},



editarProducto: (req,res) => {
    let productId = Number(req.params.id)
    let productToEdit = products.filter((p) => p.id == productId )
    
    res.render("editarProducto" ,{productToEdit})},


  updateProduct: (req, res) => {
        const productId = Number(req.params.id);
        console.log(productId);
        let productToEdit = products.find((p) => p.id === productId);
    console.log(productToEdit);
    let images = req.files ; 
    console.log(req.files);
console.log(images);
    let imagecolor1 = images[0].filename;
    let imagecolor2 = images[1].filename;
    let imagecolor3 = images[2].filename;  

    productToEdit = {
      ...req.body,
      id: productId,
      imagecolor1,
      imagecolor2,
      imagecolor3,
    };

    const updatedProducts = products.map((p) => {
        if (p.id === productToEdit.id) {
          return (p = { ...productToEdit });
        }
        return p;
      });
  
      fs.writeFileSync(
        productsFilePath,
        JSON.stringify(updatedProducts),
        "utf-8"
      );
  
      res.redirect("/");
    },
  





// Detalle del Producto //

productDetail: (req,res) => {
    
    let id = req.params.id
    let productDetail = products.filter((p) => p.id == id )
    
    res.render("productDetail", {productDetail})
},

// Delete - borrar un producto//

destroy: (req, res) => {
    const productId = Number(req.params.id);
    const finalProducts = products.filter ((p) =>p.id != productId);
    
    fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts), "utf-8");
    res.redirect("/");
},

};



module.exports = productsController