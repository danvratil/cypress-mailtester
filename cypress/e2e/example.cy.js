describe('MailTester plugin test', () => {
    it('Can get mailtester instance', () => {
        cy.mailtester().then(mailtester => {
            expect(mailtester).to.exist
        })
    })

    it('Can create an address', () => {
        cy.mailtester().then(async (mailtester) => {
            const address = await mailtester.createAddress()
            expect(address).to.contain('mailtester+')
            expect(address).to.contain('@dvratil.cz')
        })
    })
})
