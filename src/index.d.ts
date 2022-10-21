/// <reference types="cypress" />
import { MailTester } from './mailtester'

declare global {
    namespace Cypress {
        interface Chainable {
            mailtester: MailTester
        }
    }
}
