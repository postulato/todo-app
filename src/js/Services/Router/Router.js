import routerConfig from "./routerConfig.js";
import Store from "../../Services/Store/Store.js";

export default class Router {
  constructor(anchor) {
    this.anchor = anchor;
    window.addEventListener("popstate", event => {
      this.changeRoute(event.state.route);
    });
    Store.events.subscribe("changeRoute", state => {
      this.changeRoute(state.userState.currentLink);
    });
  } 

  changeRoute(route) {
    if (this.component) {
      this.component.selfDestroy();
    }

    window.history.pushState(
      routerConfig[route]["data"],
      "",
      routerConfig[route]["url"]
    );

    this.component = new routerConfig[route]["component"](
      this.anchor,
      routerConfig[route]["settings"]
    );
    if (this.component.onInit) {
      this.component.onInit();
    }
    this.component.render();
  }
}
