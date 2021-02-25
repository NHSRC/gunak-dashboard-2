import DashboardState from "./DashboardState";
import MetabaseResources from "./MetabaseResources";

it('default url', () => {
  let dashboardState = DashboardState.newInstance("");
  expect(dashboardState.resource.name).toEqual(MetabaseResources.Main.name);
});

it('', () => {
    
});

