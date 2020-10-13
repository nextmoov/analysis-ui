// ***********************************************************
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import 'cypress-wait-until'

import {localFixturePath} from './commands'

// Should data be reset?
const resetData = Cypress.env('resetDataBeforeEachRun')

/**
 * TODO do this directly via MongoDB
 */
before('Optionally wipe configured state', () => {
  if (resetData === true) {
    cy.task('touch', localFixturePath)
    cy.fixture('regions/.scratch').then((storedVals) => {
      if ('regionId' in storedVals) {
        cy.visit(`/regions/${storedVals.regionId}/edit`)
        cy.navComplete()
        cy.findByRole('button', {name: /Delete this region/i}).click()
        cy.findByRole('alertdialog').should('exist')
        cy.findByRole('button', {name: /Confirm: Delete this region/}).click()
        cy.findByRole('alertdialog').should('not.exist')
      }
    })
    cy.writeFile(localFixturePath, '{}')
  }
})

/**
 * Uncaught exceptions should not occur in the app, but we need to be able to test what happens when they do.
 */
Cypress.on('uncaught:exception', (err) => {
  console.error(err)
  // returning false here prevents Cypress from
  // failing the test
  return false
})
