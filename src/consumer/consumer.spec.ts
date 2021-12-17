import chai from "chai"
import path from "path"
import chaiAsPromised from "chai-as-promised"
import { Pact, Interaction, Matchers } from "@pact-foundation/pact"
import {like} from "@pact-foundation/pact/src/dsl/matchers";
import {CatFacts} from "../index";
const expect = chai.expect;

chai.use(chaiAsPromised);


describe("The Cat Facts API", () => {
    const url = "http://localhost";
    let catFacts: CatFacts;
// defining provider
    const provider = new Pact({
        // port,
        log: path.resolve(process.cwd(), "logs", "cat-facts.log"),
        dir: path.resolve(process.cwd(), "pacts"),
        spec: 1,
        consumer: "Front",
        provider: "Cat Facts Api"
    });
// defining expected body
    const expected_body = {
        "fact": "In 1888, more than 300,000 mummified cats were found an Egyptian cemetery. They were stripped of their wrappings and carted off to be used by farmers in England and the U.S. for fertilizer.",
        "length": 189
    };

// hooks
    before(() =>
        provider.setup().then(opts => {
            catFacts = new CatFacts({ url, port: opts.port })
        })
    )

    after(() => provider.finalize())

    afterEach(() => provider.verify())

//first tests get /fact from cat facts api
    describe("get /fact", () => {
        before(() => {
            const interaction = new Interaction()
                .given("I have a list of facts")
                .uponReceiving("a request for a random fact")
                .withRequest({
                    method: "GET",
                    path: "/fact",
                    headers: {
                        Accept: "application/json",
                    },
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: like(expected_body)
                })

            return provider.addInteraction(interaction)
        })

        it("returns the correct response", done => {
            catFacts.getCatFact().then((response: any) => {
                expect(response.data).to.deep.eq(expected_body)
                done()
            }, done)
        })
    })

});
