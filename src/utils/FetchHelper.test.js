import {paramsToUrlFragment} from "./FetchHelper";

it('params To Url Fragment', function () {
  let params = {"state": "Goa"};
  let urlFragment = paramsToUrlFragment(params);
  expect(urlFragment).toEqual("state=Goa");
});

it('params To Url Fragment with nil params', function () {
  let params = {"state": "Goa", "program": undefined};
  let urlFragment = paramsToUrlFragment(params);
  expect(urlFragment).toEqual("state=Goa");
});
