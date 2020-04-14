import { DataService } from '../app/model/data.service';

// A sample Jasmine test
describe("DataService", function() {
  it("conatins items", function() {
     const service = new DataService();
     expect(service.getItems().length).toBeGreaterThan(0);
  });
});
