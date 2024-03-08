/// <reference types="cypress" />

describe("First test suite", () => {
  it("First test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // by Tag name
    cy.get("input");

    //by id
    cy.get("#inputEmail1");

    //by Class value
    cy.get(".input-full-width");

    //by Attribute name
    cy.get("[fullwidth]");

    //by Attribute and value
    cy.get('[placeholder="Email"]');

    //by entire Class value
    cy.get("[class='input-full-width size-medium shape-rectangle']");

    //by two attributes
    cy.get('[placeholder="Email"][fullwidth]');

    //by tag, attribute id and class
    cy.get("input[placeholder='Email']#inputEmail1.input-full-width");

    //by Cypress test ID - most recomended
    cy.get('[data-cy="imputEmail1"]');
  });

  it("second", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // Main methods to find Web Elements:
    // get() - ALWAYS find elements on the ENTIRE page by locator globally
    // find() - find CHILD elements by locator
    // contains() - find HTML text and by text and locator. It finds only the first match!

    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");
    cy.contains("nb-card", "Horizontal form").find("button");
    cy.contains("nb-card", "Horizontal form").contains("Sign in");

    //cypress chains and DOM, it is not recommended to chain commands after the action (click, etc.)
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });

  it("save subject of the command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find("[for='inputEmail1']")
      .should("contain", "Email");
    cy.contains("nb-card", "Using the Grid")
      .find("[for='inputPassword2']")
      .should("contain", "Password");

    //1 Cypress Alias
    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");
    cy.get("@usingTheGrid")
      .find("[for='inputEmail1']")
      .should("contain", "Email");
    cy.get("@usingTheGrid")
      .find("[for='inputPassword2']")
      .should("contain", "Password");

    // 2 Cypress then() methods
    cy.contains("nb-card", "Using the Grid").then((usingTheGridForm) => {
      cy.wrap(usingTheGridForm)
        .find("[for='inputEmail1']")
        .should("contain", "Email");
      cy.wrap(usingTheGridForm)
        .find("[for='inputPassword2']")
        .should("contain", "Password");
    });
  });

  it("Extract text values", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail"]').should("contain", "Email address");

    //2 label is a jQuery object
    cy.get('[for="exampleInputEmail"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email adress"); // first approach
      cy.wrap(labelText).should("contain", "Email address"); // second approach
    });

    //3
    cy.get('[for="exampleInputEmail"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email adress");
      });

    //4 getting class value
    cy.get('[for="exampleInputEmail"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });

    //5 invoke a property
    cy.get("#exampleInputEmail").type("test@test.com");
    cy.get("#exampleInputEmail")
      .invoke("prop", "value")
      .should("contain", "test@test.com");
  });
});
