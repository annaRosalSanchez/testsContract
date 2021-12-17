import { Verifier, VerifierOptions } from '@pact-foundation/pact';
import { resolve } from "path";

async function getOpts(): Promise<VerifierOptions> {
    return {
        provider: 'Cat Facts Api',
        providerBaseUrl: 'https://catfact.ninja',
        pactBrokerUrl: 'http://localhost:9299',
        publishVerificationResult: true,
        providerVersion: '1.0.0',
        logDir: resolve(process.cwd(), 'logs', 'verification.log'),
        logLevel: 'info'
    };
}

describe('cat fats Verification', () => {
    it('should validate api responses', async () => {
        const opts = await getOpts();

        return new Verifier(opts)
            .verifyProvider()
            .then(() => {
                console.log('Verifying cat facts Provider has been successful');
            })
            .catch(error => {
                console.log('failed', error);
                process.exit(1);
            });
    });
});
