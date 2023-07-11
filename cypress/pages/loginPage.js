class loginPage{


    elements ={
        emailInput : () => cy.getByData("email-input"),
        submitBtn : () => cy.getByData("submit-button"),
        successMessage : () => cy.getByData("success-message")
    }


    clickOnSubmitBtn(){
        this.elements.submitBtn().click()
    }

    subscribeForUpdate(correo){
        this.elements.emailInput().type(correo)
        this.elements.submitBtn().click()
        cy.getByData("server-error-message")
     .contains("Error: "+correo+" already exists. Please use a different email address.")

    }

    login(usuario,clave){
      if (usuario!==undefined){  
        cy.getByData("username").type(usuario)
      }
      if (clave!==undefined){
        cy.getByData("password").type(clave)
      }
      cy.getByData("login-button").click()
    }
}


module.exports = new loginPage();
