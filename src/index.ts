/// <reference types="./">
import { MailTester } from './mailtester';

function register(Cypress: Cypress.Cypress) {
  const mailtester = new MailTester();
  Cypress.Commands.add(
    'mailtester' as any,
    (): Promise<MailTester> => {
      return Promise.resolve(mailtester);
    }
  );
}

register(Cypress);
