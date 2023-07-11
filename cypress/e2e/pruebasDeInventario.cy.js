import loginPage from "../pages/loginPage"
import inventoryPage from "../pages/inventoryPage"


describe("testing", () => {
  beforeEach(() => {
    cy.intercept('/service-worker.js', {
      body: undefined
     })
    cy.clearAllSessionStorage({log: true})
    cy.visit('https://www.saucedemo.com/',
     { timeout: 30000, retryOnStatusCodeFailure: true, retryOnNetworkFailure: true }); 
     loginPage.login("standard_user","secret_sauce")
  })

  context("2. Menu", () => { 
    it.only("a) Validar opciones de menú correcta y en orden correcto",()=> {
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
      cy.getById("react-burger-menu-btn").click()
      cy.getByClass("bm-item-list").children().each(($ch, index) => {
        console.log($ch)
        if(index===0){
          if($ch.text()!=='All Items'){
           cy.fail()
          }
        }
        if(index===1){
          if($ch.text()!=='About'){
           cy.fail()
          } 
        }   
        if(index===2){
          if($ch.text()!== 'Logout'){
            cy.fail()
          }
        }
        if(index===3){
          if($ch.text()!=='Reset App State'){
            cy.fail()
          }  
        }
      })
    })
    it.only("b) Validar que el menu se muestre y se oculte",()=> {
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
      cy.getById("react-burger-menu-btn").click()
      cy.getByClass("bm-menu-wrap").should('be.visible');
    })
   }) 
  
   context("3. Inventory", () => {
    it.only("a) Validar los 6 productos", () => {
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
      inventoryPage.validarProducto(0, "Sauce Labs Backpack", "$29.99", "item_4_img_link", "/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg", "Add to cart")
      inventoryPage.validarProducto(1, "Sauce Labs Bike Light", "$9.99", "item_0_img_link", "/static/media/bike-light-1200x1500.37c843b0.jpg", "Add to cart")
      inventoryPage.validarProducto(2, "Sauce Labs Bolt T-Shirt", "$15.99", "item_1_img_link", "/static/media/bolt-shirt-1200x1500.c2599ac5.jpg", "Add to cart")
      inventoryPage.validarProducto(3, "Sauce Labs Fleece Jacket", "$49.99", "item_5_img_link", "/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg", "Add to cart")
      inventoryPage.validarProducto(4, "Sauce Labs Onesie", "$7.99", "item_2_img_link", "/static/media/red-onesie-1200x1500.2ec615b2.jpg", "Add to cart")
      inventoryPage.validarProducto(5, "Test.allTheThings() T-Shirt (Red)", "$15.99", "item_3_img_link", "/static/media/red-tatt-1200x1500.30dadef4.jpg", "Add to cart")
    })
  })
  
  context("4. Vista Detalle de producto", () => {
    it.only("a) Abrir un producto cualquier y validar imagen, nombre y precio", () => {
      
      //verificar estamos en pagina de inventario
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

      //seleccionar producto Sauce Labs Backpack      
      cy.getByClass("inventory_item_name").contains("Sauce Labs Backpack").click()

      //verificar que estamos en la pagina de detalle del producto seleccionado
      cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=4')
      
      //verificar datos del producto
      cy.get(".inventory_details_img").should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg')
      cy.get(".inventory_details_name").contains("Sauce Labs Backpack")
      cy.get(".inventory_details_price").contains("29.99")

      //regresar a la pagina de productos
      cy.getByData("back-to-products").click()
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })
  })
})   
