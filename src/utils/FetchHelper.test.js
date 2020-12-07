import {paramsToUrlFragment} from "./FetchHelper";

it('paramsToUrlFragment', function () {
  let params = {"state": "Goa"};
  let urlFragment = paramsToUrlFragment(params);
  expect(urlFragment).toEqual("state=Goa");
});
