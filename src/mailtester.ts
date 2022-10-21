export type Email = {
  subject?: string;
  to?: string;
  from?: string;
  body?: string;
};

export class MailTester {
  baseUrl = 'https://mailtester.dvratil.cz';

  async createAddress(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/address/create`, {
      method: 'POST',
      mode: 'cors',
    });
    console.log(response);
    if (!response.ok) {
      console.log(response.status);
      return Promise.reject(
        new Error('MailTester error: failed to create address')
      );
    }
    const jsdata = await response.json();
    return jsdata.address;
  }

  async waitForEmail(address: string): Promise<Email> {
    const response = await fetch(`${this.baseUrl}/email/waitForEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: address,
      }),
      mode: 'cors',
    });

    if (!response.ok) {
      const responseData = await response.json();
      return Promise.reject(
        new Error(`MailTester error: ${responseData.message}`)
      );
    }

    const responseData = await response.json();
    if (responseData.status === 'OK') {
      return Promise.resolve((responseData.message as unknown) as Email);
    }

    if (responseData.status === 'TIMEOUT') {
      return Promise.reject(new Error(`Timeout: ${responseData.message}`));
    }

    return Promise.reject(new Error('MailTester error'));
  }
}
