import MetabaseResources from "./MetabaseResources";

it('should getUniqueFilterParams', function () {
  let filterParams = MetabaseResources.getUniqueFilterParams();
  expect(filterParams.length).toEqual(6);
  expect(filterParams[0]).toEqual("assessment_id");
});
