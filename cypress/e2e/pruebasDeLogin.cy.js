import loginPage from "../pages/loginPage"

describe("testing", () => {
  beforeEach(() => {
    cy.intercept('/service-worker.js', {
      body: undefined
     })
    cy.clearAllSessionStorage({log: true})
    cy.visit('https://www.saucedemo.com/',
     { timeout: 30000, retryOnStatusCodeFailure: true, retryOnNetworkFailure: true }); 
  })

  context("1. Prueba de login", () => {     
    it.only("a) Login incorrecto con Usuario o contraseña vacíos",()=> {
      loginPage.login()
      cy.getByData("error").should("exist").contains("Epic sadface: Username is required")
    })
    it.only("b) Login incorrecto con password incorrecto",()=> {
      loginPage.login("Dal12@gmail.com","dagxbdkj")
      cy.getByData("error").should("exist")
      .contains("Epic sadface: Username and password do not match any user in this service")
    }) 
    it.only("c) Login exitoso (standard_user)",()=> {
      loginPage.login("standard_user","secret_sauce")
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })           
  })

})  