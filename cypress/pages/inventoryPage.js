class inventoryPage{
    validarProducto(indice, nombre, precio, idImagen, nombreImagen, boton) {
        cy.getByClass("inventory_item").eq(indice).contains(nombre)
        cy.getByClass("inventory_item").eq(indice).contains(precio)
        cy.getById(idImagen).children().invoke("attr", "src").should("contain", nombreImagen)
        cy.getByClass("inventory_item").eq(indice).contains(boton)
    }
}
module.exports = new inventoryPage();