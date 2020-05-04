import { DataService } from "../app/model/data.service";

// A sample Jasmine test
describe("DataService", () => {
    it("conatins items", () => {
        const service = new DataService();
        expect(service.getItems().length).toBeGreaterThan(0);
    });
});
